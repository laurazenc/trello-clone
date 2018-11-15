const redis = require("redis");
const bluebird = require("bluebird");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const redisHost = process.env.NODE_ENV === "production" ? "redis" : "127.0.0.1";
const redisPort = "6379";
let client;
if (process.env.REDIS_URL) {
  client = redis.createClient(process.env.REDIS_URL);
} else {
  client = redis.createClient(redisPort, redisHost);
}

client.on("connect", () => {
  console.log(`[👂🏻 ] Redis connected to ${redisHost}:${redisPort}`);
});

client.on("error", err => {
  console.log(
    `[❌ ] Redis could not connect to ${redisHost}:${redisPort}: ${err}`
  );
});

module.exports = client;
