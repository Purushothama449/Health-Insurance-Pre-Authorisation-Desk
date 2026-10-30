from datetime import datetime
from fastapi import APIRouter, HTTPException
from app.database import get_db_connection
from app.retrieval.vector_store import vector_store

router = APIRouter()

@router.get("/policy/documents")
def get_policy_documents():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM policy_documents")
    rows = cursor.fetchall()
    conn.close()
    return {"documents": [dict(r) for r in rows]}

@router.get("/policy/clauses/{clause_id}")
def get_policy_clause(clause_id: str):
    clause = vector_store.get_clause_by_id(clause_id)
    return clause

@router.post("/policy/reindex")
def reindex_policy_corpus():
    vector_store._build_index()
    now_str = datetime.now().strftime("%d %b %Y, %H:%M")
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE policy_documents SET last_indexed = ?, index_status = 'Indexed'", (now_str,))
    conn.commit()
    conn.close()

    return {
        "status": "SUCCESS",
        "message": f"Successfully reindexed policy corpus. Total chunks active: {len(vector_store.chunks)}.",
        "last_indexed": now_str
    }
