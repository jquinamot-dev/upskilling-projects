// Simple server-side caching mechanism but doesnt have cache eviction logic
function serverCache() {
  let cache = new Map();

  return function (key, fetchFn) {
    if (!cache.has(key)) {
      cache.set(key, fetchFn());
    }
    return cache.get(key);
  };
}

const getData = serverCache();

setInterval(() => {
  getData(Date.now(), () => {
    return "Fetched Data";
  });
}, 1000);

// simple server-side caching mechanism with cache eviction logic (size based)
function serverCacheWithEviction(cacheLimit = 100) {
  let cache = new Map();
  return function (key, fetchFn) {
    // check if the key exists in cache
    if (!cache.has(key)) {
      // check if cache size exceeds limit (by default 100)
      if (cache.size >= cacheLimit) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }
      // if not in cache and size limit not exceeded, fetch and store in cache
      cache.set(key, fetchFn());
    }
    // if cache hit, return cached value
    console.log(cache);
    return cache.get(key);
  };
}

const getDataWithEviction = serverCacheWithEviction(10);

setInterval(() => {
  getDataWithEviction(Date.now(), () => {
    return "Fetched Data with Eviction";
  });
}, 1000);
