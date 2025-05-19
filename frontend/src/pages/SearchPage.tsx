import React from 'react';
import logo from '../assets/logo.png';
import { SearchForm } from '../components/SearchForm';
import { ServicesList } from '../components/ServicesList';
import MapComponent from '../components/MapComponent';
import { useTransportServices } from '../hooks/useTransportServices';

const SearchPage: React.FC = () => {
  const {
    fromCity,
    setFromCity,
    toCity,
    setToCity,
    services,
    loading,
    error,
    cities,
    searchServices
  } = useTransportServices();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchServices();
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header with logo and title */}
        <div className="flex items-center justify-between mb-10">
          <img src={logo} alt="Logo" className="w-64 object-contain" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center flex-1">Transport Services Search</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Column: Filters and Results */}
          <div className="flex flex-col h-full justify-start space-y-8">
            <SearchForm
              fromCity={fromCity}
              setFromCity={setFromCity}
              toCity={toCity}
              setToCity={setToCity}
              cities={cities}
              loading={loading}
              onSubmit={handleSearch}
            />

            {error && (
              <div className="bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <ServicesList services={services} />
          </div>

          {/* Right Column: Map */}
          <div className="flex items-start justify-center w-full">
            <MapComponent 
              fromCity={fromCity}
              toCity={toCity}
              services={services}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage; 