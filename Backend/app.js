import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './Src/routes/auth.route.js';
import destinationRoute from './Src/routes/destination.route.js'

import { ENV } from './Src/config/env.js';
import { connectDB } from './Src/config/DB.js';
import serviceProviderRoute from './Src/routes/serviceProvider.route.js';
import serviceRoute from './Src/routes/service.route.js';
import bookingRoute from './Src/routes/booking.route.js';
import paymentRoute from './Src/routes/payment.route.js';
import reviewRoute from './Src/routes/review.route.js';

dotenv.config();

const app = express();
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use("/api/auth", authRoutes);
app.use("/api/destinations", destinationRoute);
app.use("/api/providers", serviceProviderRoute);
app.use("/api/services", serviceRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/reviews", reviewRoute);

app.listen(ENV.PORT, () => {
    console.log(`Server is running on port http://localhost:${ENV.PORT}`);
    connectDB();
    
});