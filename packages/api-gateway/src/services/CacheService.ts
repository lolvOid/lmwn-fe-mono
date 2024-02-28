import NodeCache from 'node-cache';

class CacheService {
  private cache: NodeCache;

  constructor(ttl: number) {
    this.cache = new NodeCache({ stdTTL: ttl });
  }

  get(key: string) {
    return this.cache.get(key);
  }

  set(key: string, value: any) {
    this.cache.set(key, value);
  }

  has(key: string) {
    return this.cache.has(key);
  }

  // Add more cache-related methods as needed
}

const MenuCache = new CacheService(500);
const RestaurantCache = new CacheService(500);

export { MenuCache, RestaurantCache };