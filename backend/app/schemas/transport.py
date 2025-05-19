from pydantic import BaseModel, Field, validator
from ..models.enums import City, TransportCompany
from typing import List

class TransportService(BaseModel):
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
        if 'from_city' in values:
            # Allow same cities only when both are OTHER
            if v == values['from_city'] and v != City.OTHER:
                raise ValueError('Origin and destination cities must be different')
        return v

    class Config:
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