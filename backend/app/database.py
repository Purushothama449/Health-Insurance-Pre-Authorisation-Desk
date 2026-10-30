import sqlite3
import json
import os
from datetime import datetime, timezone
from app.config import settings

def get_db_connection():
    conn = sqlite3.connect(settings.DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Pre-auth runs table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS runs (
            run_id TEXT PRIMARY KEY,
            patient_id TEXT NOT NULL,
            hospital_name TEXT NOT NULL,
            policy_number TEXT NOT NULL,
            room_category TEXT NOT NULL,
            procedure TEXT NOT NULL,
            policy_start_date TEXT NOT NULL,
            admission_type TEXT NOT NULL,
            admission_date TEXT NOT NULL,
            status TEXT NOT NULL,
            created_at TEXT NOT NULL,
            completed_at TEXT,
            processing_time_sec REAL,
            recommendation TEXT,
            confidence TEXT,
            reason TEXT,
            indicative_limit TEXT,
            escalation TEXT,
            supporting_evidence TEXT,
            trace_steps TEXT,
            prompt_version TEXT,
            total_tokens INTEGER DEFAULT 0,
            cost_usd REAL DEFAULT 0.0,
            feedback_status TEXT,
            feedback_reason TEXT
        )
    ''')
    
    # Policy documents index table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS policy_documents (
            doc_id TEXT PRIMARY KEY,
            insurer TEXT NOT NULL,
            product TEXT NOT NULL,
            version TEXT NOT NULL,
            pages INTEGER NOT NULL,
            chunks INTEGER NOT NULL,
            index_status TEXT NOT NULL,
            last_indexed TEXT NOT NULL,
            embedding_model TEXT NOT NULL
        )
    ''')

    # Seed Policy Documents if empty
    cursor.execute("SELECT COUNT(*) FROM policy_documents")
    if cursor.fetchone()[0] == 0:
        cursor.executemany('''
            INSERT INTO policy_documents (doc_id, insurer, product, version, pages, chunks, index_status, last_indexed, embedding_model)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', [
            ("DOC-STAR-01", "Star Health & Allied Insurance", "Star Comprehensive Health Insurance", "v3.2 (2025)", 64, 128, "Indexed", "30 Sep 2026, 09:00", "all-MiniLM-L6-v2"),
            ("DOC-HDFC-02", "HDFC ERGO General Insurance", "Optima Secure Policy", "v2.1 (2025)", 48, 96, "Indexed", "30 Sep 2026, 09:15", "all-MiniLM-L6-v2"),
            ("DOC-CARE-03", "Care Health Insurance", "Care Supreme Policy", "v4.0 (2026)", 52, 104, "Indexed", "30 Sep 2026, 09:30", "all-MiniLM-L6-v2"),
            ("DOC-NIVA-04", "Niva Bupa Health Insurance", "ReAssure 2.0 Policy", "v1.8 (2025)", 40, 80, "Indexed", "30 Sep 2026, 09:45", "all-MiniLM-L6-v2")
        ])

    # Seed Initial Runs if empty
    cursor.execute("SELECT COUNT(*) FROM runs")
    if cursor.fetchone()[0] == 0:
        sample_evidence_10001 = json.dumps([
            {
                "clause_id": "Clause 5.2",
                "title": "Cataract Treatment Coverage",
                "page": 18,
                "retrieved_text": "Cataract surgery is covered under the plan subject to applicable limits and waiting period provisions as specified in Section 7.",
                "full_clause": "Clause 5.2 — Cataract Treatment Coverage: Cataract surgery is covered under the plan subject to applicable limits and waiting period provisions as specified in Section 7. Sum Insured up to ₹5 Lakhs: Up to ₹35,000 per eye (max ₹50,000 per policy period). Sum Insured ₹10 Lakhs & above: Up to ₹50,000 per eye (max ₹75,000 per policy period).",
                "source_document": "Star Comprehensive Health Insurance Policy Wording (Page 18)",
                "retrieval_score": 0.94
            },
            {
                "clause_id": "Clause 7.1",
                "title": "Waiting Period for Specified Conditions",
                "page": 42,
                "retrieved_text": "Treatment for cataract and related conditions shall be covered after a waiting period of 12 months (or 24 months depending on policy tier) from the policy start date.",
                "full_clause": "Clause 7.1 — Waiting Period for Specified Conditions: Treatment for cataract and related conditions shall be covered after a waiting period of 12 months from the policy start date. Any claim prior to completion of 12 months requires explicit query to hospital for proof of prior continuous coverage or pre-authorization hold.",
                "source_document": "Star Comprehensive Health Insurance Policy Wording (Page 42)",
                "retrieval_score": 0.91
            }
        ])

        sample_trace_10001 = json.dumps([
            {
                "agent": "Validation Agent",
                "step": "Validation",
                "status": "Success",
                "latency_ms": 2000,
                "tool_calls": ["validate_request_fields"],
                "query": "Patient P1001, Procedure Cataract Surgery",
                "retrieved_passages": 0,
                "prompt_version": "v1",
                "token_count": 210,
                "cost_usd": 0.0004,
                "verification_result": "PASSED"
            },
            {
                "agent": "Policy Analysis Agent",
                "step": "Policy Agent",
                "status": "Success",
                "latency_ms": 18000,
                "tool_calls": ["search_policy", "search_waiting_period"],
                "query": "Cataract Surgery policy coverage and waiting period clause",
                "retrieved_passages": 2,
                "prompt_version": "v1",
                "token_count": 1450,
                "cost_usd": 0.0029,
                "verification_result": "PRELIMINARY_QUERY"
            },
            {
                "agent": "Retrieval Agent",
                "step": "Retrieval",
                "status": "Success",
                "latency_ms": 12000,
                "tool_calls": ["get_clause(Clause 5.2)", "get_clause(Clause 7.1)"],
                "query": "Retrieve exact Clause 5.2 and Clause 7.1 text",
                "retrieved_passages": 2,
                "prompt_version": "v1",
                "token_count": 890,
                "cost_usd": 0.0018,
                "verification_result": "CLAUSES_RETRIEVED"
            },
            {
                "agent": "Verification Agent",
                "step": "Verification",
                "status": "Success",
                "latency_ms": 8000,
                "tool_calls": ["verify_evidence_support", "check_waiting_period_match"],
                "query": "Verify if admission date (30 Sep 2026) vs start date (01 Oct 2025) satisfies 12-month waiting period",
                "retrieved_passages": 2,
                "prompt_version": "v1",
                "token_count": 920,
                "cost_usd": 0.0018,
                "verification_result": "VERIFIED_WITH_QUERY"
            },
            {
                "agent": "Orchestrator Node",
                "step": "Completed",
                "status": "Completed",
                "latency_ms": 2000,
                "tool_calls": ["format_recommendation_response"],
                "query": "Finalize pre-authorization recommendation result",
                "retrieved_passages": 2,
                "prompt_version": "v1",
                "token_count": 430,
                "cost_usd": 0.0008,
                "verification_result": "QUERY-TO-HOSPITAL"
            }
        ])

        runs_seed = [
            (
                "RUN-10001", "P1001", "ABC Hospital", "POL12345", "Private", "Cataract Surgery",
                "01-10-2025", "Planned Surgical", "30-09-2026", "Completed",
                "30 Sep 2026, 10:15", "30 Sep 2026, 10:16", 42.0,
                "QUERY-TO-HOSPITAL", "Verified",
                "The procedure appears to be covered, but the policy contains a waiting-period provision applicable to cataract-related treatment.",
                "₹ 1,50,000", "Medical/claims officer review required",
                sample_evidence_10001, sample_trace_10001, "v1", 3900, 0.0077, None, None
            ),
            (
                "RUN-10000", "P1002", "City Care Hospital", "POL67890", "Private", "Knee Replacement",
                "15-01-2023", "Planned Surgical", "30-09-2026", "Completed",
                "30 Sep 2026, 09:42", "30 Sep 2026, 09:43", 38.5,
                "APPROVE-RECOMMENDED", "Verified",
                "Total knee arthroplasty covered under Section 3.1. 24-month specific waiting period satisfied (Policy active 44 months).",
                "₹ 3,50,000", "Approved within sub-limit",
                json.dumps([{
                    "clause_id": "Clause 3.1",
                    "title": "Inpatient Hospitalization Coverage",
                    "page": 12,
                    "retrieved_text": "Indemnification for major orthopedic surgeries including total joint replacement.",
                    "full_clause": "Clause 3.1 — Inpatient Hospitalization: Full coverage up to sum insured for total knee replacement after completion of 24 months continuous policy duration.",
                    "source_document": "Optima Secure Policy Wording (Page 12)",
                    "retrieval_score": 0.96
                }]),
                json.dumps([]), "v1", 3100, 0.0062, None, None
            ),
            (
                "RUN-09999", "P1003", "St. Jude Hospital", "POL11223", "Twin Sharing", "Normal Delivery",
                "01-05-2025", "Maternity", "30-09-2026", "Processing",
                "30 Sep 2026, 09:30", None, 0.0,
                "PROCESSING", "Pending",
                "Analyzing maternity benefit coverage and 24-month waiting period clause.",
                "₹ 50,000", "Agent evaluating evidence",
                json.dumps([]), json.dumps([]), "v1", 1200, 0.0024, None, None
            ),
            (
                "RUN-09998", "P1004", "General Hospital", "POL44556", "General", "Appendectomy",
                "10-02-2024", "Emergency", "29-09-2026", "Completed",
                "29 Sep 2026, 18:20", "29 Sep 2026, 18:21", 29.0,
                "APPROVE-RECOMMENDED", "Verified",
                "Emergency appendectomy fully covered under Section 3.1. Emergency waiver applies for 30-day waiting period.",
                "₹ 2,00,000", "Direct cashless authorization approved",
                json.dumps([{
                    "clause_id": "Clause 3.1",
                    "title": "Emergency Surgical Hospitalization",
                    "page": 8,
                    "retrieved_text": "Emergency abdominal surgery covered without waiting period under Section 3.1.",
                    "full_clause": "Clause 3.1 — Emergency Hospitalization: Emergency surgeries including acute appendicitis are covered immediately from day 1.",
                    "source_document": "Care Supreme Policy Wording (Page 8)",
                    "retrieval_score": 0.98
                }]),
                json.dumps([]), "v1", 2800, 0.0056, None, None
            ),
            (
                "RUN-09997", "P1005", "Apollo Specialty", "POL99887", "Private", "Chemotherapy",
                "01-01-2026", "Day Care", "29-09-2026", "Medical Review",
                "29 Sep 2026, 17:10", "29 Sep 2026, 17:11", 45.0,
                "MEDICAL-REVIEW", "Escalated",
                "Daycare chemotherapy session is covered under Day Care list, but protocol drug list requires verification by Medical Claims Officer.",
                "₹ 1,20,000", "Medical officer manual authorization required",
                json.dumps([{
                    "clause_id": "Clause 3.2",
                    "title": "Day Care Chemotherapy Coverage",
                    "page": 24,
                    "retrieved_text": "Chemotherapy administration covered under Day Care Procedure Annexure.",
                    "full_clause": "Clause 3.2 — Day Care Oncology: Chemotherapy sessions covered under daycare provided protocol is approved.",
                    "source_document": "Star Comprehensive Policy (Page 24)",
                    "retrieval_score": 0.92
                }]),
                json.dumps([]), "v1", 4100, 0.0082, None, None
            )
        ]

        cursor.executemany('''
            INSERT INTO runs (
                run_id, patient_id, hospital_name, policy_number, room_category, procedure,
                policy_start_date, admission_type, admission_date, status,
                created_at, completed_at, processing_time_sec,
                recommendation, confidence, reason, indicative_limit, escalation,
                supporting_evidence, trace_steps, prompt_version, total_tokens, cost_usd,
                feedback_status, feedback_reason
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', runs_seed)

    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()
