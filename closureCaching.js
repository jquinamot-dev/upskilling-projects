/**
 * Requirements
 *
 * - Use closures
 * - No classes (functional approach only)
 * - Write eviction lgoic
 * - Show example usage with simulated data fetching
 */

function serverCacheWithEviction(cacheLimit = 5) {
  let cache = new Map();

  async function get(key, fetchFn) {
    if (!cache.has(key)) {
      // If cache size exceeds limit, evict the oldest entry
      if (cache.size >= cacheLimit) {
        const oldestKey = cache.keys().next().value;
        cache.delete(oldestKey);
      }
      // Fetch and store in cache
      const result = fetchFn();
      cache.set(key, result instanceof Promise ? await result : result);
    }
    return cache.get(key);
  }

  function keys() {
    return Array.from(cache.keys());
  }

  function clear() {
    cache.clear();
  }

  function deleteKey(key) {
    cache.delete(key);
  }

  return {
    get,
    keys,
    clear,
    deleteKey,
  };
}

const cache = serverCacheWithEviction();

async function fetchData(id) {
  // Simulate data fetching
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data for ID: ${id}`);
    }, 100);
  });
}

(async () => {
  console.log(await cache.get("1", () => fetchData(1))); // Fetches and caches
  console.log(await cache.get("2", () => fetchData(2))); // Fetches and caches
  console.log(await cache.get("3", () => fetchData(3))); // Fetches and caches
  console.log(await cache.get("4", () => fetchData(4))); // Fetches and caches
  console.log(await cache.get("5", () => fetchData(5))); // Fetches and caches
  console.log("Cache Keys after adding 5 items:", cache.keys());
  console.log(await cache.get("6", () => fetchData(5))); // Fetches and caches
  cache.deleteKey("3"); // Manually delete key "3"
  console.log("Cache Keys after adding 5 items:", cache.keys());
})();
