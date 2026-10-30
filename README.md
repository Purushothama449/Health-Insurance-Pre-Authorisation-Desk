# Health Insurance Pre-Authorisation Desk

### Multi-Agent AI System for Health Insurance Policy Analysis

## 1. Project Overview

The **Health Insurance Pre-Authorisation Desk** is an AI-powered multi-agent system designed to assist insurance teams in evaluating hospital pre-authorisation requests.

The system analyzes health insurance policy documents to identify coverage conditions, waiting periods, exclusions, sub-limits, and room eligibility. It uses Retrieval-Augmented Generation (RAG) and multiple AI agents to retrieve relevant policy clauses, verify supporting evidence, and generate explainable recommendations.

The system provides three possible outcomes:

- Approve Recommended
- Query to Hospital
- Medical Review

The system acts as a decision-support tool and does not provide final insurance authorization. The final decision remains with a human medical or insurance officer.

## 2. Problem Statement

Hospital pre-authorisation requires insurance teams to examine multiple sections of policy documents before determining whether a treatment is covered.

Important information such as coverage conditions, waiting periods, exclusions, sub-limits, and room eligibility may be distributed across different policy sections.

A basic retrieval system may identify a coverage clause but miss another provision that modifies the coverage.

This project addresses that challenge through agent-driven policy retrieval, secondary clause searching, evidence verification, and human escalation.

## 3. Project Objectives

- Automate the investigation of health insurance pre-authorisation requests.
- Retrieve relevant policy clauses using RAG.
- Identify coverage conditions and applicable limitations.
- Detect waiting periods, exclusions, and sub-limits.
- Implement a multi-agent architecture with separate responsibilities.
- Verify recommendations using retrieved policy evidence.
- Generate clause-level citations.
- Escalate uncertain cases for human review.
- Monitor system performance and reliability.

## 4. Key Features

- **Request Validation:** Validates incoming hospital requests before agent execution.
- **Admission Classification:** Identifies planned surgical, day-care, emergency, and maternity admissions.
- **Multi-Agent AI:** Uses separate reasoning and verification agents.
- **Policy Retrieval:** Retrieves relevant information from indexed policy documents.
- **Secondary Retrieval:** Searches for additional provisions that may modify apparent coverage.
- **Evidence Verification:** Checks recommendations against retrieved policy passages.
- **Clause-Level Citations:** Provides supporting policy references.
- **Human-in-the-Loop:** Escalates uncertain or unsupported cases.
- **Asynchronous Processing:** Supports background execution of requests.
- **Monitoring:** Tracks agent execution, latency, errors, and system health.

## 5. System Architecture

```text
Hospital / TPA Request
          |
          v
     React Dashboard
          |
          v
       FastAPI
          |
          v
  Request Validation
          |
          v
     Redis Queue
          |
          v
    LangGraph Workflow
          |
     +----+----+
     |         |
     v         v
 Coverage   Verification
  Agent       Agent
     |         |
     +----+----+
          |
          v
    Retrieval Tools
          |
          v
     FAISS Index
          |
          v
    Policy Corpus
          |
          v
 Final Recommendation
          |
    +-----+------+
    |     |      |
 Approve Query  Medical
Recommended    Review
```

## 6. Multi-Agent Architecture

### Agent 1: Coverage / Reasoning Agent

Responsibilities:

- Understand and investigate the pre-authorisation request.
- Identify relevant clinical and policy entities.
- Retrieve applicable policy provisions.
- Search for coverage conditions and limitations.
- Identify waiting periods, exclusions, and sub-limits.
- Perform additional searches when required.
- Generate a candidate recommendation with supporting evidence.

### Agent 2: Verification Agent

Responsibilities:

- Verify the candidate recommendation.
- Check whether each claim is supported by retrieved passages.
- Validate clause-level citations.
- Detect unsupported or conflicting information.
- Request additional retrieval when necessary.
- Escalate cases when sufficient evidence is unavailable.

## 7. RAG Pipeline

The proposed document retrieval process:

```text
Insurance Policy Documents
          |
          v
     PDF Extraction
          |
          v
      Text Cleaning
          |
          v
        Chunking
          |
          v
      Embeddings
          |
          v
     FAISS Vector Index
          |
          v
  Relevant Policy Retrieval
          |
          v
       AI Agents
          |
          v
 Evidence-Based Recommendation
```

Retrieved passages should preserve document names, page numbers, sections, and clause identifiers.

Policy-specific facts must come from the actual indexed policy documents. Demo or synthetic policy content must be clearly identified and must not be presented as genuine insurance terms.

## 8. Difficult Demonstration Scenario

**Scenario: Planned Cataract Surgery — Policy Issued 11 Months Ago**

A simple RAG system may retrieve a clause that appears to cover cataract surgery but miss a separate waiting-period provision.

Our proposed system:

1. Retrieves the relevant coverage provision.
2. Examines whether another provision can modify the coverage.
3. Performs a secondary search for waiting-period conditions.
4. Retrieves additional supporting passages.
5. Compares the relevant policy conditions.
6. Passes the evidence to the Verification Agent.
7. Generates a supported recommendation or escalates the case.

This demonstrates the difference between single-pass RAG and agent-driven policy reasoning.

## 9. Technology Stack

| Technology | Purpose |
|---|---|
| Python | Backend development and AI logic |
| FastAPI | REST API |
| LangGraph | Multi-agent workflow orchestration |
| LangChain | LLM and retrieval integration |
| FAISS | Vector similarity search |
| Sentence Transformers | Text embeddings |
| React | Frontend dashboard |
| Redis | Queue and caching |
| PostgreSQL | Database |
| Docker Compose | Containerized deployment |
| Prometheus | Metrics collection |
| Grafana | Monitoring dashboards |
| OpenTelemetry | Distributed tracing |
| Jaeger | Trace visualization |
| Locust | Load testing |

## 10. Project Structure

```text
Health-Insurance-Pre-Authorisation-Desk/
│
├── backend/
│   ├── agents/
│   ├── api/
│   ├── retrieval/
│   ├── services/
│   └── tests/
│
├── frontend/
│
├── corpus/
│
├── monitoring/
│
├── prompts/
│
├── docker-compose.yml
├── .env.example
└── README.md
```

The structure represents the intended organization of the project. Individual modules may vary according to the implementation.

## 11. Installation and Execution

### Prerequisites

- Python
- Node.js
- Docker Desktop
- Docker Compose
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/Purushothama449/Health-Insurance-Pre-Authorisation-Desk.git
```

### Step 2: Open the Project

```bash
cd Health-Insurance-Pre-Authorisation-Desk
```

### Step 3: Configure Environment Variables

Create a local `.env` file using `.env.example` if provided.

Do not commit API keys, passwords, or other credentials.

### Step 4: Build Docker Containers

```bash
docker compose build
```

### Step 5: Start the Application

```bash
docker compose up -d
```

### Step 6: Check Running Services

```bash
docker compose ps
```

### Step 7: View Application Logs

```bash
docker compose logs --tail=100
```

### Step 8: Stop the Application

```bash
docker compose down
```

## 12. Application URLs

After successfully starting the Docker services:

| Service | URL |
|---|---|
| Frontend Dashboard | http://localhost:3000 |
| FastAPI Backend | http://localhost:8000 |
| API Documentation | http://localhost:8000/docs |
| Prometheus | http://localhost:9090 |
| Grafana | http://localhost:3001 |
| Jaeger | http://localhost:16686 |

These URLs use the port mappings configured in the Docker Compose file.

## 13. Evaluation and Performance

The system is designed to be evaluated using:

- Groundedness
- Context Relevance
- Faithfulness
- Hallucination Rate
- End-to-End Latency
- p50 and p95 Response Time
- Requests Per Second
- Agent Success Rate
- Tool Calls and Retry Rate
- Token Usage and Cost

A fixed evaluation dataset of at least 20 scenarios is planned, with expected outcomes and supporting policy passages.

Performance testing uses Locust with a stub model to measure system performance independently of external model-provider rate limits.

Actual evaluation and performance results should be added after testing.

## 14. Safety and Responsible Use

- The system provides recommendations, not final insurance authorization.
- Recommendations must be supported by retrieved policy evidence.
- Uncertain cases must be escalated for human review.
- Only synthetic patient data should be used.
- Credentials must not be stored in the repository.
- Demo policy content must not be represented as genuine policy wording.

## 15. Future Enhancements

- Support for multiple insurance companies.
- Support for additional health insurance products.
- Improved OCR for scanned policy documents.
- Expanded policy evaluation datasets.
- Advanced analytics and monitoring.
- Improved human feedback mechanisms.
- Enhanced scalability and performance.

## 16. Team Members

| Name | SRN |
|---|---|
| Purushothama K C | PES1UG25AM810 |
| Yogish K J | PES1UG25AM819 |
| Chethan B J | PES1UG25AM426 |

## 17. Academic Information

- **Course:** ML System Design & AgentOps
- **Course Code:** UE24AM342AA5
- **Institution:** PES University, Bengaluru
- **Department:** Computer Science and Engineering (AI & ML)
- **Project:** Mini Project 03 — Health Insurance Pre-Authorisation Desk

## 18. Conclusion

The Health Insurance Pre-Authorisation Desk demonstrates how multi-agent AI and Retrieval-Augmented Generation can support health insurance policy analysis.

By combining agent-driven secondary retrieval, independent evidence verification, clause-level citations, and human-in-the-loop escalation, the system aims to provide more reliable and explainable pre-authorisation recommendations.

---

**Developed by Team Purushothama, Yogish and Chethan**  
**PES University | ML System Design & AgentOps**
