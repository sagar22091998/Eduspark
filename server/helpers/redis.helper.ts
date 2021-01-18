import redisClient from '../config/redis';
import { promisify } from 'util';

const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);
const expireAsync = promisify(redisClient.expire).bind(redisClient);
const timeLeftAsync = promisify(redisClient.ttl).bind(redisClient);

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

export const expireRedis = async (key: string): Promise<number> => {
    const data: number = await timeLeftAsync(key);
    return data;
};

export const deleteRedis = async (key: string): Promise<string> => {
    await redisClient.del(key);
    return 'Deleted Successfully';
};
