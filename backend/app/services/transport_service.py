from typing import List
from ..models.enums import City, TransportCompany
from ..schemas.transport import TransportService
from ..core.data import transport_services

class TransportServiceManager:
    @staticmethod
    def get_all_services() -> List[TransportService]:
        return transport_services

    @staticmethod
    def get_services_by_route(from_city: City, to_city: City) -> List[TransportService]:
        # Caso 1: New York to Washington DC
        if from_city == City.NEW_YORK and to_city == City.WASHINGTON_DC:
            return [
                service for service in transport_services 
                if service.company in [TransportCompany.KNIGHT_SWIFT, TransportCompany.JB_HUNT, TransportCompany.YRC]
            ]
        
        # Caso 2: San Francisco to Los Angeles
        if from_city == City.SAN_FRANCISCO and to_city == City.LOS_ANGELES:
            return [
                service for service in transport_services 
                if service.company in [TransportCompany.XPO, TransportCompany.SCHNEIDER, TransportCompany.LANDSTAR]
            ]
        
        # Caso 3: Cualquier otra ruta
        return [
            service for service in transport_services 
            if service.company in [TransportCompany.UPS, TransportCompany.FEDEX]
        ]

    @staticmethod
    def get_services_by_company(company: TransportCompany) -> List[TransportService]:
        return [
            service for service in transport_services 
            if service.company == company
        ]

    @staticmethod
    def get_available_cities() -> List[str]:
        return [city.value for city in City]

    @staticmethod
    def get_available_companies() -> List[str]:
        return [company.value for company in TransportCompany] 