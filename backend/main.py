import os
import time
import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from backend.projects_data import projects
from backend.models import Project

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Portfolio API",
    description="Backend for the portfolio website, serving dynamic content.",
    version="1.0.0"
)

# Middleware for observability (request logging and timing)
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    logger.info(
        f"Method: {request.method} Path: {request.url.path} "
        f"Status: {response.status_code} Duration: {process_time:.4f}s"
    )
    response.headers["X-Process-Time"] = str(process_time)
    return response

# Configure CORS using environment variables for security
allowed_origins = os.getenv(
    "ALLOWED_ORIGINS", 
    "http://localhost:5173,http://127.0.0.1:5173"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

@app.get("/api/projects", response_model=List[Project])
async def get_projects():
    """
    Retrieve the list of all projects.
    Returns strictly typed Project objects.
    """
    return projects

@app.get("/api/health")
async def health_check():
    """
    Health check endpoint to verify API availability.
    """
    return {"status": "ok"}

