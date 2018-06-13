const serializePromises = promiseFuncs =>
  promiseFuncs.reduce(
    async (promise, f) => [await f(), ...(await promise)],
    Promise.resolve([]),
  );

module.exports = { serializePromises };
