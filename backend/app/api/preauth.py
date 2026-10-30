import json
import sqlite3
import random
from datetime import datetime
from fastapi import APIRouter, HTTPException, BackgroundTasks
from app.models import PreAuthRequest, PreAuthRunResponse
from app.validation.request_validator import validate_preauth_request
from app.database import get_db_connection
from app.agents.workflow import execute_preauth_workflow
from app.observability.metrics import metrics_tracker

router = APIRouter()

def process_run_background(run_id: str, request_data: dict):
    # Execute workflow and update database
    result = execute_preauth_workflow(request_data)
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE runs SET
            status = ?,
            completed_at = ?,
            processing_time_sec = ?,
            recommendation = ?,
            confidence = ?,
            reason = ?,
            indicative_limit = ?,
            escalation = ?,
            supporting_evidence = ?,
            trace_steps = ?
        WHERE run_id = ?
    ''', (
        result["status"],
        result["completed_at"],
        result["processing_time_sec"],
        result["recommendation"],
        result["confidence"],
        result["reason"],
        result["indicative_limit"],
        result["escalation"],
        json.dumps(result["supporting_evidence"]),
        json.dumps(result["trace_steps"]),
        run_id
    ))
    conn.commit()
    conn.close()

    metrics_tracker.record_run(
        latency_sec=result["processing_time_sec"],
        recommendation=result["recommendation"],
        tool_call_count=len(result["trace_steps"])
    )

@router.post("/preauth", response_model=dict)
def submit_preauth_request(req: PreAuthRequest, background_tasks: BackgroundTasks):
    # 1. Validation
    val_res = validate_preauth_request(req)
    if not val_res.valid:
        raise HTTPException(
            status_code=400,
            detail={
                "error": "Request rejected during validation check.",
                "field": val_res.field,
                "message": val_res.error
            }
        )

    # 2. Generate Run ID
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM runs")
    count = cursor.fetchone()[0]
    run_id = f"RUN-{10002 + count}"
    
    now_str = datetime.now().strftime("%d %b %Y, %H:%M")
    
    # Store initial status as PROCESSING
    cursor.execute('''
        INSERT INTO runs (
            run_id, patient_id, hospital_name, policy_number, room_category, procedure,
            policy_start_date, admission_type, admission_date, status, created_at, prompt_version
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        run_id, req.patient_id, req.hospital_name, req.policy_number, req.room_category, req.procedure,
        req.policy_start_date, req.admission_type, req.admission_date, "Processing", now_str, req.prompt_version or "v1"
    ))
    conn.commit()
    conn.close()

    request_data = req.dict()
    request_data["run_id"] = run_id

    # Execute in background task
    background_tasks.add_task(process_run_background, run_id, request_data)

    return {
        "status": "QUEUED",
        "run_id": run_id,
        "message": "Pre-authorization request successfully queued for multi-agent processing.",
        "created_at": now_str
    }
