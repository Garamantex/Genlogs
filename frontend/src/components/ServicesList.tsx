import { memo } from 'react';
import { FixedSizeList as List } from 'react-window';
import type { TransportService } from '../types/transport';

interface ServicesListProps {
  services: TransportService[];
}

const ServiceItem = memo(({ service }: { service: TransportService }) => (
  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex justify-between items-center">
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

export const ServicesList = memo(({ services }: ServicesListProps) => {
  if (services.length === 0) return null;

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <ServiceItem service={services[index]} />
    </div>
  );

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Available Transport Services</h2>
      <List
        height={400}
        itemCount={services.length}
        itemSize={100}
        width="100%"
        className="space-y-4"
      >
        {Row}
      </List>
    </div>
  );
});

ServicesList.displayName = 'ServicesList'; 