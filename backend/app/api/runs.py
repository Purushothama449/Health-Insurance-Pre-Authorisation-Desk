import json
from typing import Optional, List
from fastapi import APIRouter, HTTPException, Query
from app.database import get_db_connection

router = APIRouter()

def row_to_run_dict(row) -> dict:
    d = dict(row)
    d["supporting_evidence"] = json.loads(d["supporting_evidence"]) if d.get("supporting_evidence") else []
    d["trace_steps"] = json.loads(d["trace_steps"]) if d.get("trace_steps") else []
    return d

@router.get("/runs")
def list_runs(
    search: Optional[str] = None,
    status: Optional[str] = None,
    admission_type: Optional[str] = None,
    limit: int = 50,
    offset: int = 0
):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    query = "SELECT * FROM runs WHERE 1=1"
    params = []

    if search:
        query += " AND (run_id LIKE ? OR patient_id LIKE ? OR procedure LIKE ? OR hospital_name LIKE ?)"
        pattern = f"%{search}%"
        params.extend([pattern, pattern, pattern, pattern])

    if status and status != "All":
        query += " AND status = ?"
        params.append(status)

    if admission_type and admission_type != "All":
        query += " AND admission_type = ?"
        params.append(admission_type)

    query += " ORDER BY rowid DESC LIMIT ? OFFSET ?"
    params.extend([limit, offset])

    cursor.execute(query, params)
    rows = cursor.fetchall()
    
    cursor.execute("SELECT COUNT(*) FROM runs")
    total_count = cursor.fetchone()[0]

    conn.close()

    runs = [row_to_run_dict(r) for r in rows]
    return {
        "runs": runs,
        "total": total_count,
        "limit": limit,
        "offset": offset
    }

@router.get("/runs/{run_id}")
def get_run_details(run_id: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM runs WHERE run_id = ?", (run_id,))
    row = cursor.fetchone()
    conn.close()
    
    if not row:
        raise HTTPException(status_code=404, detail=f"Run ID '{run_id}' not found.")
    
    return row_to_run_dict(row)

@router.get("/runs/{run_id}/result")
def get_run_result(run_id: str):
    run = get_run_details(run_id)
    return {
        "run_id": run["run_id"],
        "status": run["status"],
        "recommendation": run.get("recommendation"),
        "confidence": run.get("confidence"),
        "reason": run.get("reason"),
        "indicative_limit": run.get("indicative_limit"),
        "escalation": run.get("escalation"),
        "supporting_evidence": run.get("supporting_evidence", []),
        "processing_time_sec": run.get("processing_time_sec")
    }

@router.get("/trace/{run_id}")
def get_run_trace(run_id: str):
    run = get_run_details(run_id)
    return {
        "run_id": run["run_id"],
        "trace_steps": run.get("trace_steps", [])
    }
