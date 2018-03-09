/**
 * cache data TTL, in seconds.
 */
const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

module.exports = {
  WORKSPACE_SUMMARY_TTL: 5 * MINUTE,
  WORKSPACE_HISTORIC_DATA_TTL: DAY,
};
