import { useState, useEffect } from 'react';
import axios from 'axios';
import type { TransportService } from '../types/transport';

const SearchPage = () => {
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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setServices([]);
    // Validar que las ciudades existan en el listado
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

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Transport Services Search</h1>
      
      <form onSubmit={handleSearch} className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fromCity" className="block text-sm font-medium text-gray-700 mb-1">
              From City
            </label>
            <input
              type="text"
              id="fromCity"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter departure city"
              list="cities-list"
              required
            />
          </div>
          
          <div>
            <label htmlFor="toCity" className="block text-sm font-medium text-gray-700 mb-1">
              To City
            </label>
            <input
              type="text"
              id="toCity"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter destination city"
              list="cities-list"
              required
            />
          </div>
        </div>
        
        <datalist id="cities-list">
          {cities.map((city) => (
            <option value={city} key={city} />
          ))}
        </datalist>
        
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-8">
          {error}
        </div>
      )}

      {services.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Transport Services</h2>
          <div className="space-y-4">
            {services.map((service, index) => (
              <div key={index} className="border border-gray-200 rounded-md p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{service.company}</h3>
                    <p className="text-sm text-gray-500">
                      {service.from_city} → {service.to_city}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {service.trucks_per_day} trucks per day
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage; 