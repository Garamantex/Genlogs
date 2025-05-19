from ..models.enums import City, TransportCompany
from ..schemas.transport import TransportService

transport_services = [
    # New York to Washington DC routes
    TransportService(
        company=TransportCompany.KNIGHT_SWIFT,
        trucks_per_day=10,
        from_city=City.NEW_YORK,
        to_city=City.WASHINGTON_DC
    ),
    TransportService(
        company=TransportCompany.JB_HUNT,
        trucks_per_day=7,
        from_city=City.NEW_YORK,
        to_city=City.WASHINGTON_DC
    ),
    TransportService(
        company=TransportCompany.YRC,
        trucks_per_day=5,
        from_city=City.NEW_YORK,
        to_city=City.WASHINGTON_DC
    ),
    # San Francisco to Los Angeles routes
    TransportService(
        company=TransportCompany.XPO,
        trucks_per_day=9,
        from_city=City.SAN_FRANCISCO,
        to_city=City.LOS_ANGELES
    ),
    TransportService(
        company=TransportCompany.SCHNEIDER,
        trucks_per_day=6,
        from_city=City.SAN_FRANCISCO,
        to_city=City.LOS_ANGELES
    ),
    TransportService(
        company=TransportCompany.LANDSTAR,
        trucks_per_day=2,
        from_city=City.SAN_FRANCISCO,
        to_city=City.LOS_ANGELES
    ),
    # Other routes
    TransportService(
        company=TransportCompany.UPS,
        trucks_per_day=11,
        from_city=City.OTHER,
        to_city=City.OTHER
    ),
    TransportService(
        company=TransportCompany.FEDEX,
        trucks_per_day=9,
        from_city=City.OTHER,
        to_city=City.OTHER
    ),
] 