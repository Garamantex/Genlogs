import React from 'react';

/**
 * Props interface for the SearchForm component
 * @interface SearchFormProps
 * @property {string} fromCity - The selected departure city
 * @property {Function} setFromCity - Function to update the departure city
 * @property {string} toCity - The selected destination city
 * @property {Function} setToCity - Function to update the destination city
 * @property {string[]} cities - List of available cities for selection
 * @property {boolean} loading - Loading state of the form
 * @property {Function} onSubmit - Form submission handler
 */
interface SearchFormProps {
  fromCity: string;
  setFromCity: (city: string) => void;
  toCity: string;
  setToCity: (city: string) => void;
  cities: string[];
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

/**
 * SearchForm Component
 * @description A form component for searching transport services between cities
 * @param {SearchFormProps} props - Component props
 * @returns {JSX.Element} Rendered search form with city selection dropdowns
 */
export const SearchForm: React.FC<SearchFormProps> = ({
  fromCity,
  setFromCity,
  toCity,
  setToCity,
  cities,
  loading,
  onSubmit
}) => {
  // Filtrar las ciudades disponibles para el campo "To City"
  const availableToCities = cities.filter(city => city !== fromCity);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700" role="search">
      <form onSubmit={onSubmit} className="space-y-4" aria-label="Search transport services">
        <div>
          <label htmlFor="fromCity" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
            From City
          </label>
          <div className="relative">
            <select
              id="fromCity"
              value={fromCity}
              onChange={(e) => {
                setFromCity(e.target.value);
                // Si la ciudad seleccionada es la misma que la ciudad de destino, resetear la ciudad de destino
                if (e.target.value === toCity) {
                  setToCity('');
                }
              }}
              className="w-full px-4 py-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-base"
              required
              aria-required="true"
              aria-label="Select departure city"
            >
              <option value="">Select departure city</option>
              {cities.map((city) => (
                <option value={city} key={city}>
                  {city}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" aria-hidden="true">
              <svg className="h-5 w-5 text-gray-500 dark:text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="toCity" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
            To City
          </label>
          <div className="relative">
            <select
              id="toCity"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              className="w-full px-4 py-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-base"
              required
              aria-required="true"
              aria-label="Select destination city"
            >
              <option value="">Select destination city</option>
              {availableToCities.map((city) => (
                <option value={city} key={city}>
                  {city}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" aria-hidden="true">
              <svg className="h-5 w-5 text-gray-500 dark:text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#2563eb] hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 transition-colors text-base"
          aria-label={loading ? 'Searching for transport services...' : 'Search for transport services'}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  );
}; 