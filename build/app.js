"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const body_parser_1 = __importDefault(require("body-parser"));
const connect_1 = require("./config/connect");
const profile_routes_1 = __importDefault(require("./routes/profile.routes"));
const instructor_courses_routes_1 = __importDefault(require("./routes/instructor.courses.routes"));
dotenv_1.config();
const app = express_1.default();
app.use(morgan_1.default('dev'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const allowedOrigins = ['http://localhost:3000'];
app.use(cors_1.default({
    origin(origin, callback) {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
app.get('/', (req, res) => {
    res.status(200).json('Welcome to Eduspark!');
});
app.use('/profile', profile_routes_1.default);
app.use('/instructor/course', instructor_courses_routes_1.default);
connect_1.connectFunc(process.env.NODE_ENV === 'production');
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Server started on port ${port}`));
exports.default = server;
//# sourceMappingURL=app.js.map