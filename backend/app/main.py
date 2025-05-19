from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import transport, general
from .core.config import settings

app = FastAPI(title=settings.PROJECT_NAME)

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir routers
app.include_router(general.router)
app.include_router(transport.router) 