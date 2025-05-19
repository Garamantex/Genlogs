from pydantic import BaseModel
from ..models.enums import City, TransportCompany

class TransportService(BaseModel):
    company: TransportCompany
    trucks_per_day: int
    from_city: City
    to_city: City 