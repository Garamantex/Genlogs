from fastapi import APIRouter
from typing import List
from ..services.transport_service import TransportServiceManager
from ..core.config import settings

router = APIRouter(tags=["general"])
service_manager = TransportServiceManager()

@router.get("/")
async def root():
    return {"message": f"Welcome to {settings.PROJECT_NAME}"}

@router.get("/api/health")
async def health_check():
    return {"status": "healthy"}

@router.get("/api/cities", response_model=List[str])
async def get_available_cities():
    return service_manager.get_available_cities()

@router.get("/api/companies", response_model=List[str])
async def get_available_companies():
    return service_manager.get_available_companies() 