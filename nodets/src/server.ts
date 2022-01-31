import * as dotenv from 'dotenv';

import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';
import sls from 'serverless-http';
// import userRouter from './routes/userRouter';
import schoolRouter from './routes/schoolRouter';
// import projectRouter from './routes/projectRouter';


dotenv.config();

const port = process.env.PORT ? process.env.PORT : 4000;

mongoose.connect(process.env.MONGOOSE || '');

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

// app.use('/api/user/', userRouter);
app.use('/api/school/', schoolRouter);
// app.use('/api/project/', projectRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports.server = sls(app);
