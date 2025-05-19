import os
import uvicorn
from app.main import app

if __name__ == "__main__":
    # Get port from environment variable, default to 10000 as per Render docs
    port = int(os.environ.get("PORT", 10000))
    print(f"Starting server on port {port}")
    print(f"Environment variables: PORT={os.environ.get('PORT')}")
    
    # Run the server with explicit configuration
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=port,
        reload=False,
        log_level="debug",
        access_log=True
    ) 