import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});