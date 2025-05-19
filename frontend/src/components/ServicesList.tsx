import { memo } from 'react';
import { FixedSizeList as List } from 'react-window';
import type { TransportService } from '../types/transport';

/**
 * Props interface for the ServicesList component
 * @interface ServicesListProps
 * @property {TransportService[]} services - List of transport services to display
 */
interface ServicesListProps {
  services: TransportService[];
}

/**
 * ServiceItem Component
 * @description Individual service item component displaying transport service details
 * @param {Object} props - Component props
 * @param {TransportService} props.service - Transport service data
 * @returns {JSX.Element} Rendered service item
 */
const ServiceItem = memo(({ service }: { service: TransportService }) => (
  <div 
    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex justify-between items-center"
    role="article"
    aria-label={`Transport service from ${service.from_city} to ${service.to_city} by ${service.company}`}
  >
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{service.company}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {service.from_city} → {service.to_city}
      </p>
    </div>
    <div className="text-right">
      <p className="text-base font-bold text-gray-900 dark:text-white">
        {service.trucks_per_day} <span className="font-normal text-sm">trucks per day</span>
      </p>
    </div>
  </div>
));

ServiceItem.displayName = 'ServiceItem';

/**
 * ServicesList Component
 * @description Displays a virtualized list of available transport services
 * @param {ServicesListProps} props - Component props
 * @returns {JSX.Element | null} Rendered list of services or null if empty
 */
export const ServicesList = memo(({ services }: ServicesListProps) => {
  if (services.length === 0) return null;

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <ServiceItem service={services[index]} />
    </div>
  );

  return (
    <div 
      className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
      role="region"
      aria-label="Available Transport Services"
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Available Transport Services</h2>
      <div role="list" aria-label="List of transport services">
        <List
          height={Math.min(services.length * 100, 400)}
          itemCount={services.length}
          itemSize={100}
          width="100%"
          className="space-y-4"
        >
          {Row}
        </List>
      </div>
    </div>
  );
});

ServicesList.displayName = 'ServicesList'; 