from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

class AgentExecutionState(BaseModel):
    run_id: str
    patient_id: str
    hospital_name: str
    policy_number: str
    room_category: str
    procedure: str
    policy_start_date: str
    admission_type: str
    admission_date: str
    prompt_version: str = "v1"
    
    # Internal agent pipeline state
    current_step: str = "Validation"
    retrieved_evidence: List[Dict[str, Any]] = []
    tool_calls: List[str] = []
    preliminary_recommendation: Optional[str] = None
    preliminary_reason: Optional[str] = None
    final_recommendation: Optional[str] = None
    confidence: str = "Pending"
    final_reason: Optional[str] = None
    indicative_limit: str = "₹ 1,50,000"
    escalation: str = "None"
    trace_steps: List[Dict[str, Any]] = []
    
    total_tokens: int = 0
    cost_usd: float = 0.0
    error: Optional[str] = None
