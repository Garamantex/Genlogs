from enum import Enum

class City(str, Enum):
    """Enumeration of available cities for transport services.
    
    This enum represents all cities that are available as departure or destination
    points in the transport service system.
    """
    NEW_YORK = "New York"
    WASHINGTON_DC = "Washington DC"
    SAN_FRANCISCO = "San Francisco"
    LOS_ANGELES = "Los Angeles"

class TransportCompany(str, Enum):
    """Enumeration of available transport companies.
    
    This enum represents all transport companies that provide services in the system.
    Each company is a major player in the transport industry.
    """
    KNIGHT_SWIFT = "Knight-Swift Transport Services"
    JB_HUNT = "J.B. Hunt Transport Services Inc"
    YRC = "YRC Worldwide"
    XPO = "XPO Logistics"
    SCHNEIDER = "Schneider"
    LANDSTAR = "Landstar Systems"
    UPS = "UPS Inc."
    FEDEX = "FedEx Corp" 