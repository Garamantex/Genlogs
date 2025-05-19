import { useState, useEffect } from 'react';
import axios from 'axios';
import type { TransportService } from '../types/transport';

export const useTransportServices = () => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [services, setServices] = useState<TransportService[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    // Fetch available cities from backend
    axios.get('http://localhost:8000/api/cities')
      .then(res => setCities(res.data))
      .catch(() => setCities([]));
  }, []);

  const searchServices = async () => {
    setLoading(true);
    setError('');
    setServices([]);

    if (!cities.includes(fromCity) || !cities.includes(toCity)) {
      setError("Por favor selecciona ciudades válidas de la lista.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8000/api/transport-services/route/${encodeURIComponent(fromCity)}/${encodeURIComponent(toCity)}`
      );
      setServices(response.data);
    } catch (err) {
      setError('Error fetching transport services. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    fromCity,
    setFromCity,
    toCity,
    setToCity,
    services,
    loading,
    error,
    cities,
    searchServices
  };
}; 