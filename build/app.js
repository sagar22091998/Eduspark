"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = require("dotenv");
const connect_1 = require("./config/connect");
dotenv_1.config();
const app = express_1.default();
app.use(morgan_1.default('dev'));
app.get('/', (req, res) => {
    res.status(200).json('Welcome to Eduspark!');
});
connect_1.connectFunc(process.env.ENV === 'production');
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Server started on port ${port}`));
exports.default = server;
//# sourceMappingURL=app.js.map