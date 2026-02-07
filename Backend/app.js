import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { ENV } from './Src/config/env.js';
import { connectDB } from './Src/config/DB.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(ENV.PORT, () => {

    console.log(`Server is running on port http://localhost:${ENV.PORT}`);
    connectDB();
    
});