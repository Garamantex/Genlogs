from fastapi import APIRouter
from typing import List, Dict
from ..services.transport_service import TransportServiceManager
from ..core.config import settings
import platform
import sys

router = APIRouter(tags=["general"])
service_manager = TransportServiceManager()

@router.get("/")
async def root():
    return {"message": f"Welcome to {settings.PROJECT_NAME}"}

@router.get("/api/health")
async def health_check() -> Dict:
    return {
        "status": "healthy",
        "version": "1.0.0",
        "environment": {
            "python_version": sys.version,
            "platform": platform.platform(),
        },
        "service": {
            "name": settings.PROJECT_NAME,
            "status": "operational"
        }
    }

@router.get("/api/cities", response_model=List[str])
async def get_available_cities():
    return service_manager.get_available_cities()

@router.get("/api/companies", response_model=List[str])
async def get_available_companies():
    return service_manager.get_available_companies() 