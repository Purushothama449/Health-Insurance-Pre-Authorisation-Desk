from pydantic import BaseModel, Field
from typing import List, Optional, Any

class PreAuthRequest(BaseModel):
    patient_id: str = Field(..., example="P1001")
    hospital_name: str = Field(..., example="ABC Hospital")
    policy_number: str = Field(..., example="POL12345")
    room_category: str = Field(..., example="Private")
    procedure: str = Field(..., example="Cataract Surgery")
    policy_start_date: str = Field(..., example="01-10-2025")
    admission_type: str = Field(..., example="Planned Surgical")
    admission_date: str = Field(..., example="30-09-2026")
    prompt_version: Optional[str] = "v1"

class EvidenceCard(BaseModel):
    clause_id: str
    title: str
    page: int
    retrieved_text: str
    full_clause: str
    source_document: str
    retrieval_score: float

class ExecutionTraceStep(BaseModel):
    agent: str
    step: str
    status: str
    latency_ms: int
    tool_calls: List[str]
    query: str
    retrieved_passages: int
    prompt_version: str
    token_count: int
    cost_usd: float
    verification_result: str

class PreAuthRunResponse(BaseModel):
    run_id: str
    patient_id: str
    hospital_name: str
    policy_number: str
    room_category: str
    procedure: str
    policy_start_date: str
    admission_type: str
    admission_date: str
    status: str
    created_at: str
    completed_at: Optional[str] = None
    processing_time_sec: float = 0.0
    recommendation: Optional[str] = None
    confidence: Optional[str] = None
    reason: Optional[str] = None
    indicative_limit: Optional[str] = None
    escalation: Optional[str] = None
    supporting_evidence: List[EvidenceCard] = []
    trace_steps: List[ExecutionTraceStep] = []
    prompt_version: str = "v1"

class ValidationResult(BaseModel):
    valid: bool
    field: Optional[str] = None
    error: Optional[str] = None

class FeedbackSubmission(BaseModel):
    run_id: str
    satisfactory: bool
    reason: Optional[str] = None

class EvaluationCase(BaseModel):
    case_id: str
    name: str
    procedure: str
    policy_start_date: str
    admission_date: str
    admission_type: str
    expected_recommendation: str
    expected_clause: str
    description: str

class PolicyDocumentInfo(BaseModel):
    doc_id: str
    insurer: str
    product: str
    version: str
    pages: int
    chunks: int
    index_status: str
    last_indexed: str
    embedding_model: str
