"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
var serverless_http_1 = __importDefault(require("serverless-http"));
// import userRouter from './routes/userRouter';
var schoolRouter_1 = __importDefault(require("./routes/schoolRouter"));
// import projectRouter from './routes/projectRouter';
dotenv_1.default.config();
var port = process.env.PORT ? process.env.PORT : 4000;
mongoose_1.default.connect(process.env.MONGOOSE);
var db = mongoose_1.default.connection;
db.once('open', function () {
    console.log('DB connected successfully!');
});
db.on('error', function (err) {
    console.error("Error while connecting to DB: ".concat(err.message));
});
var app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(function (req, res, next) {
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // replace with hostname of frontend (CloudFront)
    });
    next();
});
// app.use('/api/user/', userRouter);
app.use('/api/school/', schoolRouter_1.default);
// app.use('/api/project/', projectRouter);
module.exports.server = (0, serverless_http_1.default)(app);
//# sourceMappingURL=app.js.map