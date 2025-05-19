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
        return [
            service for service in transport_services 
            if service.from_city == from_city and service.to_city == to_city
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