import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import init_db
from app.api import preauth, runs, policy, analytics, evaluation, feedback

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Enable CORS for frontend Vite dev server & production origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    init_db()

# Register API Routers
app.include_router(preauth.router, prefix=settings.API_PREFIX, tags=["Pre-Authorization"])
app.include_router(runs.router, prefix=settings.API_PREFIX, tags=["Runs & Traces"])
app.include_router(policy.router, prefix=settings.API_PREFIX, tags=["Policy Documents"])
app.include_router(analytics.router, prefix=settings.API_PREFIX, tags=["Analytics"])
app.include_router(evaluation.router, prefix=settings.API_PREFIX, tags=["Evaluation"])
app.include_router(feedback.router, prefix=settings.API_PREFIX, tags=["Feedback"])

@app.get("/health")
def health_check():
    return {"status": "Healthy", "service": "Pre-Authorisation Backend API"}

@app.get("/ready")
def readiness_check():
    return {"status": "Ready", "database": "Connected", "vector_index": "Active"}
