import { useState, useCallback, memo } from 'react';
import logo from '../assets/logo.png';
import { SearchForm } from '../components/SearchForm';
import { ServicesList } from '../components/ServicesList';
import MapComponent from '../components/MapComponent';
import { useTransportServices } from '../hooks/useTransportServices';

const SearchPage = memo(() => {
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

  const [shouldUpdateMap, setShouldUpdateMap] = useState(false);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    searchServices();
    setShouldUpdateMap(prev => !prev);
  }, [searchServices]);

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900 flex items-center justify-center py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header with logo and title */}
        <div className="flex flex-col items-center justify-center mb-10 gap-2 sm:flex-row sm:items-center sm:justify-between">
          <img src={logo} alt="Logo" className="w-40 sm:w-64 object-contain" />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center sm:text-left flex-1">Transport Services Search</h1>
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
            <div className="w-full sm:w-full lg:min-w-[600px] lg:max-w-[600px] lg:w-[600px] px-0 sm:px-0 lg:px-0">
              <MapComponent 
                fromCity={fromCity}
                toCity={toCity}
                services={services}
                shouldUpdate={shouldUpdateMap}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

SearchPage.displayName = 'SearchPage';

export default SearchPage; 