"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("redis"));
const redisClient = redis_1.default.createClient(process.env.REDIS_URL || 'redis://localhost:6379');
redisClient.on('ready', () => {
    console.log('Redis is ready');
});
redisClient.on('error', () => {
    console.log('Error in Redis');
});
exports.default = redisClient;
//# sourceMappingURL=redis.js.map