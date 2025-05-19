from enum import Enum

class City(str, Enum):
    NEW_YORK = "New York"
    WASHINGTON_DC = "Washington DC"
    SAN_FRANCISCO = "San Francisco"
    LOS_ANGELES = "Los Angeles"
    OTHER = "Other"

class TransportCompany(str, Enum):
    KNIGHT_SWIFT = "Knight-Swift Transport Services"
    JB_HUNT = "J.B. Hunt Transport Services Inc"
    YRC = "YRC Worldwide"
    XPO = "XPO Logistics"
    SCHNEIDER = "Schneider"
    LANDSTAR = "Landstar Systems"
    UPS = "UPS Inc."
    FEDEX = "FedEx Corp" 