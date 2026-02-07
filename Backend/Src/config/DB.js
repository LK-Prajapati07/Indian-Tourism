import mongoose from 'mongoose';

import { ENV } from './env.js';
export const connectDB = async () => {
    try {
        await mongoose.connect(ENV.DB)
        console.log('Connected to the database');
    } catch (error) {
        console.error(error);
        console.log('Failed to connect to the database');
    }
}