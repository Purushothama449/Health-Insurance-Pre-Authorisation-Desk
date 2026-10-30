from fastapi import APIRouter, HTTPException
from app.models import FeedbackSubmission
from app.database import get_db_connection

router = APIRouter()

@router.post("/feedback")
def submit_feedback(fb: FeedbackSubmission):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    status_str = "Satisfactory" if fb.satisfactory else "Not Satisfactory"
    cursor.execute('''
        UPDATE runs SET feedback_status = ?, feedback_reason = ? WHERE run_id = ?
    ''', (status_str, fb.reason or "", fb.run_id))
    
    if cursor.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail=f"Run ID '{fb.run_id}' not found.")

    conn.commit()
    conn.close()

    return {
        "status": "SUCCESS",
        "message": f"Feedback recorded for run '{fb.run_id}'.",
        "feedback_status": status_str
    }
