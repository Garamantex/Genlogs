# 🚛 Transport Services Search Platform

A modern web application for searching and visualizing transport services between cities. The platform provides an intuitive interface to explore available transport routes, companies, and service details.

![Transport Services Platform](frontend/src/assets/logo.png)

## 🌟 Features

- 🔍 Interactive search for transport services between cities
- 🗺️ Real-time route visualization using Google Maps
- 📊 Detailed service information including:
  - Number of trucks per day
  - Route types (standard, express, special)
  - Service frequency
  - Estimated duration
- 🌙 Dark mode support
- 📱 Responsive design for all devices
- ⚡ Fast and efficient data loading
- 🔄 Real-time updates

## 🏗️ Architecture

The project is built using a modern stack with separate frontend and backend services:

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Google Maps API for route visualization
- React Window for efficient list rendering
- Axios for API communication

### Backend
- FastAPI (Python)
- Pydantic for data validation
- Type hints and modern Python features
- RESTful API design

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- Google Maps API key

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
```bash
# Windows
venv\Scripts\activate
# Unix/MacOS
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Start the backend server:
```bash
uvicorn app.main:app --reload
```

The backend API will be available at `http://localhost:8000`

## 📚 API Documentation

Once the backend is running, you can access the API documentation at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 🛠️ Technologies Used

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- @react-google-maps/api
- react-window
- axios
- Vite

### Backend
- FastAPI
- Pydantic
- Python 3.8+
- uvicorn

## 📁 Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── types/
│   └── package.json
│
└── backend/
    ├── app/
    │   ├── api/
    │   ├── core/
    │   ├── models/
    │   ├── schemas/
    │   └── services/
    └── requirements.txt
```

## 👥 Authors

- Alexander Acosta

## 🙏 Acknowledgments

- Google Maps Platform
- FastAPI documentation
- React documentation
- Tailwind CSS 