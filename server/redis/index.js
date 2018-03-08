/**
 * Loads data from redis using the given key, or fetches
 * new data if there is a cache miss, populating the cache
 * in the process.
 *
 * @param {Koa.context} ctx The current Koa context.
 * @param {string} key Redis key relating to the data
 * @param {function} fetchNewData function that returns a promise that
 * fetches fresh data
 * @param {number} ttl (optional) time-to-live for data on the cache.
 * If left blank, the data will not be set with a TTL.
 * @returns The new or cached data.
 */
const loadOrFetch = async (ctx, key, fetchNewData, ttl) => {
  const cacheData = await ctx.redisGet(key);
  if (cacheData) {
    return JSON.parse(cacheData);
  }
  const newData = await fetchNewData();
  if (ttl) {
    await ctx.redisSetex(key, ttl, JSON.stringify(newData));
  } else {
    await ctx.redisSet(key, JSON.stringify(newData));
  }
  return newData;
};

module.exports = {
  loadOrFetch,
};
