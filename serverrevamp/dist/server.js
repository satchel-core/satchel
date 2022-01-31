"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const sls = require('serverless-http');
// const userRouter = require('./routes/schoolRouter.ts');
// const schoolRouter = require('./routes/schoolRouter');
// const projectRouter = require('./routes/projectRouter');
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var bodyParser = __importStar(require("body-parser"));
var mongoose = __importStar(require("mongoose"));
var sls = __importStar(require("serverless-http"));
var userRouter_1 = __importDefault(require("./routes/userRouter"));
var schoolRouter_1 = __importDefault(require("./routes/schoolRouter"));
var projectRouter_1 = __importDefault(require("./routes/projectRouter"));
dotenv.config();
var port = process.env.PORT ? process.env.PORT : 4000;
mongoose.connect(process.env.MONGOOSE);
var db = mongoose.connection;
db.once('open', function () {
    console.log('DB connected successfully!');
});
db.on('error', function (err) {
    console.error("Error while connecting to DB: ".concat(err.message));
});
var app = (0, express_1.default)();
app.use(bodyParser.json());
app.use((0, cors_1.default)());
app.use('/api/user/', userRouter_1.default);
app.use('/api/school/', schoolRouter_1.default);
app.use('/api/project/', projectRouter_1.default);
app.listen(port, function () {
    console.log("Listening on port ".concat(port));
});
module.exports.server = sls(app);
//# sourceMappingURL=server.js.map