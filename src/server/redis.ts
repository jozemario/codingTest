import redis from "redis";
import Redis from "ioredis";
export class RedisService {
  redisClient: redis.RedisClient;
  ioRedisClient: redis.RedisClient;

  constructor() {
    this.redisClient = redis.createClient({ url: `${process.env.REDIS_URL}` });
    this.ioRedisClient = new Redis({
      host: `${process.env.REDIS_HOST}`,
      port: process.env.REDIS_PORT,
    });
    //new Redis(`${process.env.REDIS_URL}`);
  }
}

let client;

export const initClient = () => {
  client = new RedisService();
  client.ioRedisClient
    ? client.ioRedisClient.set("foo", "bar")
    : console.log("IORedis  client skipped");
  client.ioRedisClient
    ? client.ioRedisClient.get("foo", (err, res) => {
        console.log("ioRedisClient is ready", res);
      })
    : console.log("IORedis  client skipped");
  client.redisClient.set("foo", "bar");
  client.redisClient.get("foo", (err, res) => {
    console.log("redisClient is ready", res);
  });
  return client;
};

export const getClient = () => {
  return client;
};
