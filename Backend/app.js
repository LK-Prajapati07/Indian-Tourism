import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './Src/routes/auth.route.js';

import { ENV } from './Src/config/env.js';
import { connectDB } from './Src/config/DB.js';

dotenv.config();

const app = express();
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use("/api/auth", authRoutes);
// app.use("/api/destinations", destinationRoutes);
// app.use("/api/providers", serviceProviderRoutes);
// app.use("/api/services", serviceRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/reviews", reviewRoutes);

app.listen(ENV.PORT, () => {
    console.log(`Server is running on port http://localhost:${ENV.PORT}`);
    connectDB();
    
});