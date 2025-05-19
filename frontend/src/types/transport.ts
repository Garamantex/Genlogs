export interface TransportService {
    company: string;
    trucks_per_day: number;
    from_city: string;
    to_city: string;
}

export interface SearchFormData {
    fromCity: string;
    toCity: string;
} 