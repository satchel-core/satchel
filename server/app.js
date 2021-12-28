require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sls = require('serverless-http');

const userRouter = require('./src/routes/userRouter');
const schoolRouter = require('./src/routes/schoolRouter');
const projectRouter = require('./src/routes/projectRouter');

const port = process.env.PORT ? process.env.PORT : 4000;

mongoose.connect(process.env.MONGOOSE, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once('open', () => {
    console.log('DB connected successfully!');
});
db.on('error', (err) => {
    console.error(`Error while connecting to DB: ${err.message}`);
});

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res, next) {
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // replace with hostname of frontend (CloudFront)
    });
    next();
});

app.use('/api/user/', userRouter);
app.use('/api/school/', schoolRouter);
app.use('/api/project/', projectRouter);

module.exports.server = sls(app);
