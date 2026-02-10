import { configDotenv } from "dotenv";
configDotenv({ quiet: true });
export const ENV = {
    PORT: process.env.PORT,
    DB: process.env.DB,
    cloudinary_api_secret: process.env.cloudinary_api_secret,
    cloudinary_api_key: process.env.cloudinary_api_key,
    FRONTEND_URL: process.env.FRONTEND_URL,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    cloudinary_cloud_name: process.env.cloudinary_cloud_name,
    JWT_SECRET: process.env.JWT_SECRET,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD
}