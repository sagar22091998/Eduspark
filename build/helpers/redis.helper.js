"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRedis = exports.expireRedis = exports.getRedis = exports.insertRedis = void 0;
const redis_1 = __importDefault(require("../config/redis"));
const util_1 = require("util");
const getAsync = util_1.promisify(redis_1.default.get).bind(redis_1.default);
const setAsync = util_1.promisify(redis_1.default.set).bind(redis_1.default);
const expireAsync = util_1.promisify(redis_1.default.expire).bind(redis_1.default);
const timeLeftAsync = util_1.promisify(redis_1.default.ttl).bind(redis_1.default);
const insertRedis = (key, data, expire) => __awaiter(void 0, void 0, void 0, function* () {
    yield setAsync(key, JSON.stringify(data));
    yield expireAsync(key, expire || 7200);
    return 'Inserted Values in Redis';
});
exports.insertRedis = insertRedis;
const getRedis = (key) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getAsync(key);
    return data ? JSON.parse(data) : null;
});
exports.getRedis = getRedis;
const expireRedis = (key) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield timeLeftAsync(key);
    return data;
});
exports.expireRedis = expireRedis;
const deleteRedis = (key) => __awaiter(void 0, void 0, void 0, function* () {
    yield redis_1.default.del(key);
    return 'Deleted Successfully';
});
exports.deleteRedis = deleteRedis;
//# sourceMappingURL=redis.helper.js.map