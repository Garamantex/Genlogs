import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import type { TransportService } from '../types/transport';
import { debounce } from 'lodash';

/**
 * Cache key for storing cities data in localStorage
 * @constant {string}
 */
const CITIES_CACHE_KEY = 'cached_cities';

/**
 * Cache expiry time in milliseconds (24 hours)
 * @constant {number}
 */
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Custom hook for managing transport services data and operations
 * @description Handles fetching cities, searching transport services, and managing related state
 * @returns {Object} Object containing state and functions for transport services
 * @property {string} fromCity - Selected departure city
 * @property {Function} setFromCity - Function to update departure city
 * @property {string} toCity - Selected destination city
 * @property {Function} setToCity - Function to update destination city
 * @property {TransportService[]} services - List of available transport services
 * @property {boolean} loading - Loading state
 * @property {string} error - Error message if any
 * @property {string[]} cities - List of available cities
 * @property {Function} searchServices - Function to search for transport services
 */
export const useTransportServices = () => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [services, setServices] = useState<TransportService[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cities, setCities] = useState<string[]>([]);

  const fetchCities = useCallback(async () => {
    try {
      const cachedData = localStorage.getItem(CITIES_CACHE_KEY);
      if (cachedData) {
        const { cities: cachedCities, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_EXPIRY) {
          setCities(cachedCities);
          return;
        }
      }

      const response = await axios.get('https://genlogs.onrender.com//api/cities');
      const citiesData = response.data;
      setCities(citiesData);
      localStorage.setItem(CITIES_CACHE_KEY, JSON.stringify({
        cities: citiesData,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error('Error fetching cities:', error);
      setCities([]);
    }
  }, []);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  const searchServices = useCallback(debounce(async () => {
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
  }, 300), [fromCity, toCity, cities]);

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