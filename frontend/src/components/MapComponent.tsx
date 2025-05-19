import { useCallback, useState, memo, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';
import type { TransportService } from '../types/transport';

interface MapComponentProps {
  fromCity: string;
  toCity: string;
  services: TransportService[];
  shouldUpdate: boolean;
}

const containerStyle = {
  width: '100%',
  height: '600px'
};

const defaultCenter = {
  lat: 0,
  lng: 0
};

const mapOptions = {
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: true,
};

const MapComponent = memo(({ fromCity, toCity, services, shouldUpdate }: MapComponentProps) => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<number>(0);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places']
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleRouteSelect = useCallback((index: number) => {
    setSelectedRoute(index);
  }, []);

  useEffect(() => {
    if (!isLoaded || !map || !fromCity || !toCity || !shouldUpdate) return;

    const directionsService = new google.maps.DirectionsService();
    
    directionsService.route(
      {
        origin: fromCity,
        destination: toCity,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          // Limit to 3 routes if there are more
          if (result.routes.length > 3) {
            result.routes = result.routes.slice(0, 3);
          }
          setDirections(result);
          setError(null);
        } else {
          setError(`Error getting directions: ${status}`);
          console.error('Directions request failed:', status);
        }
      }
    );
  }, [isLoaded, map, fromCity, toCity, shouldUpdate]);

  if (loadError) {
    return (
      <div 
        className="w-full h-[600px] bg-red-100 flex items-center justify-center text-red-700 p-4 rounded-lg"
        role="alert"
        aria-live="assertive"
      >
        Error loading Google Maps: {loadError.message}
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div 
        className="w-full h-[600px] bg-gray-200 flex items-center justify-center"
        role="status"
        aria-live="polite"
      >
        Loading map...
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="w-full h-[600px] bg-yellow-100 flex items-center justify-center text-yellow-700 p-4 rounded-lg"
        role="alert"
        aria-live="assertive"
      >
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-4 p-4 sm:p-6 lg:p-0" role="region" aria-label="Transport route map">
      {directions && directions.routes.length > 1 && (
        <div 
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700"
          role="radiogroup"
          aria-label="Select route"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Select Route:</h3>
          <div className="flex gap-4">
            {directions.routes.map((route, index) => (
              <button
                key={index}
                onClick={() => handleRouteSelect(index)}
                className={`px-4 py-2 rounded transition-colors ${
                  selectedRoute === index
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                }`}
                role="radio"
                aria-checked={selectedRoute === index}
                aria-label={`Route ${index + 1}: ${route.legs[0].distance?.text} - ${route.legs[0].duration?.text}`}
              >
                Route {index + 1}
                <div className="text-sm">
                  {route.legs[0].distance?.text} - {route.legs[0].duration?.text}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      <div 
        className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg"
        role="application"
        aria-label={`Map showing route from ${fromCity} to ${toCity}`}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          onLoad={onLoad}
          onUnmount={onUnmount}
          center={defaultCenter}
          zoom={2}
          options={mapOptions}
        >
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                routeIndex: selectedRoute,
                suppressMarkers: false,
                polylineOptions: {
                  strokeColor: selectedRoute === 0 ? '#4285F4' : '#34A853',
                  strokeWeight: 5,
                },
              }}
            />
          )}
        </GoogleMap>
      </div>
    </div>
  );
});

MapComponent.displayName = 'MapComponent';

export default MapComponent; 