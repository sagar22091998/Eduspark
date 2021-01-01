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
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeFunc = exports.connectFunc = void 0;
const mongoose_1 = require("mongoose");
// Database URL Picker
const DB_PARA = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
};
/**
 * Connect to MonngoDB via mongoose
 * @param {boolean} production_env - Param if production environment is to be used
 */
const connectFunc = (production_env) => __awaiter(void 0, void 0, void 0, function* () {
    const DB_URI = production_env
        ? process.env.MONGODB_URL
        : process.env.TESTDB_URL || 'mongodb://127.0.0.1:27017/eduspark';
    try {
        const mongooseInstance = yield mongoose_1.connect(DB_URI, DB_PARA);
        console.log('Connected to Database');
        return mongooseInstance;
    }
    catch (error) {
        console.error.bind('Connection Error: ', error);
    }
});
exports.connectFunc = connectFunc;
/**
 * Disconnects from MongoDB via mongoose
 */
const closeFunc = () => {
    console.log('Connection close');
    return mongoose_1.disconnect();
};
exports.closeFunc = closeFunc;
//# sourceMappingURL=connect.js.map