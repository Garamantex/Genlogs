from typing import List
from ..models.enums import City, TransportCompany
from ..schemas.transport import TransportService
from ..core.data import transport_services

class TransportServiceManager:
    """Manager class for handling transport service operations.
    
    This class provides methods to retrieve transport services based on different criteria
    such as route, company, and available options.
    """

    @staticmethod
    def get_all_services() -> List[TransportService]:
        """Retrieves all available transport services.

        Returns:
            List[TransportService]: A list of all transport services in the system.
        """
        return transport_services

    @staticmethod
    def get_services_by_route(from_city: City, to_city: City) -> List[TransportService]:
        """Retrieves transport services for a specific route between two cities.

        Args:
            from_city (City): The departure city.
            to_city (City): The destination city.

        Returns:
            List[TransportService]: A list of transport services available for the specified route.
        """
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
        """Retrieves all transport services for a specific company.

        Args:
            company (TransportCompany): The transport company to filter by.

        Returns:
            List[TransportService]: A list of transport services provided by the specified company.
        """
        return [
            service for service in transport_services 
            if service.company == company
        ]

    @staticmethod
    def get_available_cities() -> List[str]:
        """Retrieves a list of all available cities in the system.

        Returns:
            List[str]: A list of city names available for transport services.
        """
        return [city.value for city in City]

    @staticmethod
    def get_available_companies() -> List[str]:
        """Retrieves a list of all available transport companies.

        Returns:
            List[str]: A list of transport company names available in the system.
        """
        return [company.value for company in TransportCompany] 