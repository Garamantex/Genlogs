from pydantic import BaseModel, Field, validator
from ..models.enums import City, TransportCompany
from typing import List

class TransportService(BaseModel):
    """Schema for transport service data.
    
    This model represents a transport service between two cities, including details
    about the company, route, and service characteristics.

    Attributes:
        company (TransportCompany): The transport company providing the service.
        trucks_per_day (int): Number of trucks available per day (must be greater than 0).
        from_city (City): The origin city of the route.
        to_city (City): The destination city of the route.
        description (str | None): Optional additional description of the route.
        route_type (str): Type of route (standard, express, special).
        estimated_duration_hours (float | None): Optional estimated duration in hours.
        service_frequency (str): Frequency of the service (daily, weekly, custom).
    """
    company: TransportCompany = Field(
        description="Transport company providing the service",
        examples=[company.value for company in TransportCompany]
    )
    trucks_per_day: int = Field(
        description="Number of trucks available per day",
        gt=0
    )
    from_city: City = Field(
        description="Origin city",
        examples=[city.value for city in City]
    )
    to_city: City = Field(
        description="Destination city",
        examples=[city.value for city in City]
    )
    description: str | None = Field(
        default=None,
        description="Additional description of the route"
    )
    route_type: str = Field(
        default="standard",
        description="Type of route (standard, express, special)",
        examples=["standard", "express", "special"]
    )
    estimated_duration_hours: float | None = Field(
        default=None,
        description="Estimated duration of the route in hours"
    )
    service_frequency: str = Field(
        default="daily",
        description="Frequency of the service",
        examples=["daily", "weekly", "custom"]
    )

    @validator('to_city')
    def validate_cities(cls, v, values):
        """Validates that origin and destination cities are different.
        
        Args:
            v (City): The destination city to validate.
            values (dict): Dictionary containing other field values.
            
        Raises:
            ValueError: If origin and destination cities are the same.
            
        Returns:
            City: The validated destination city.
        """
        if 'from_city' in values:
            # Allow same cities only when both are OTHER
            if v == values['from_city'] and v != City.OTHER:
                raise ValueError('Origin and destination cities must be different')
        return v

    class Config:
        """Pydantic model configuration.
        
        Provides example data for API documentation.
        """
        json_schema_extra = {
            "example": {
                "company": "UPS Inc.",
                "trucks_per_day": 11,
                "from_city": "Other",
                "to_city": "Other",
                "description": "Routes between cities different from NYC/SF and WashingtonDC/Los Angeles",
                "route_type": "standard",
                "estimated_duration_hours": 24.0,
                "service_frequency": "daily"
            }
        } 