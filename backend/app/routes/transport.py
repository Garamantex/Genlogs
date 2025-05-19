from fastapi import APIRouter, HTTPException
from typing import List
from ..models.enums import City, TransportCompany
from ..schemas.transport import TransportService
from ..services.transport_service import TransportServiceManager

router = APIRouter(prefix="/api/transport-services", tags=["transport"])
service_manager = TransportServiceManager()

@router.get("/", response_model=List[TransportService])
async def get_all_services():
    return service_manager.get_all_services()

@router.get("/route/{from_city}/{to_city}", response_model=List[TransportService])
async def get_services_by_route(from_city: City, to_city: City):
    services = service_manager.get_services_by_route(from_city, to_city)
    if not services:
        raise HTTPException(
            status_code=404, 
            detail=f"No transport services found for route {from_city} to {to_city}"
        )
    return services

@router.get("/company/{company}", response_model=List[TransportService])
async def get_services_by_company(company: TransportCompany):
    services = service_manager.get_services_by_company(company)
    if not services:
        raise HTTPException(
            status_code=404, 
            detail=f"No services found for company {company}"
        )
    return services 