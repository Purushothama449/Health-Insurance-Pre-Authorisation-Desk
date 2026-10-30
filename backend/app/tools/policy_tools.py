from typing import List, Dict, Any
from app.retrieval.vector_store import vector_store

def search_policy(query: str) -> List[Dict[str, Any]]:
    """Search policy document corpus for relevant coverage clauses."""
    return vector_store.search(query, top_k=3)

def get_clause(clause_id: str) -> Dict[str, Any]:
    """Retrieve complete clause text by Clause ID."""
    return vector_store.get_clause_by_id(clause_id)

def search_waiting_period(procedure: str) -> List[Dict[str, Any]]:
    """Search specific waiting period clauses for a given medical procedure."""
    query = f"waiting period for {procedure} 12 months 24 months specific illness clause"
    return vector_store.search(query, top_k=2)

def search_exclusions(procedure: str) -> List[Dict[str, Any]]:
    """Search policy exclusions for a given procedure or admission type."""
    query = f"exclusions non-covered treatment {procedure}"
    return vector_store.search(query, top_k=2)

def search_sub_limits(procedure: str) -> List[Dict[str, Any]]:
    """Search policy sub-limits for room rent, surgery capping, or procedure caps."""
    query = f"sub-limit limit capping {procedure} room rent"
    return vector_store.search(query, top_k=2)

def search_daycare(procedure: str) -> List[Dict[str, Any]]:
    """Search daycare procedure list and technological advancement coverage."""
    query = f"day care procedures list {procedure} anesthesia less than 24 hours"
    return vector_store.search(query, top_k=2)
