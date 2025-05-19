from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Transport Services API"
    BACKEND_CORS_ORIGINS: List[str] = ["https://genlogs-frontend.onrender.com"]
    
    class Config:
        case_sensitive = True

settings = Settings() 