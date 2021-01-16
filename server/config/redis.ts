import redis, { RedisClient } from 'redis';

const redisClient: RedisClient = redis.createClient(
    process.env.REDIS_URL || 'redis://localhost:6379'
);

redisClient.on('ready', () => {
    console.log('Redis is ready');
});

redisClient.on('error', () => {
    console.log('Error in Redis');
});

export default redisClient;
