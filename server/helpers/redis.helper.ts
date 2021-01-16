import redisClient from '../config/redis';
import { promisify } from 'util';

const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);
const expireAsync = promisify(redisClient.expire).bind(redisClient);

export const insertRedis = async (
    key: string,
    data: unknown,
    expire: number
): Promise<string> => {
    await setAsync(key, JSON.stringify(data));
    await expireAsync(key, expire || 7200);
    return 'Inserted Values in Redis';
};

export const getRedis = async (key: string): Promise<unknown> => {
    const data = await getAsync(key);
    return data ? JSON.parse(data) : null;
};
