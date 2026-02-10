🧳 Indian Tourism Backend API

A scalable, role-based backend for an Indian Tourism platform, built with Node.js, Express, MongoDB, supporting tourists, service providers, and admin moderation, including Stripe payments, Cloudinary media, and secure JWT authentication.

🚀 Features
👥 Role-Based System

Tourist – browse destinations, book services, make payments, write reviews

Service Provider – create services (after admin approval)

Admin – approve providers, services, bookings, and reviews

🗺️ Core Modules

Authentication & Authorization (JWT + Cookies)

Destinations management

Service Provider onboarding & approval

Services creation & moderation

Booking lifecycle management

Stripe payment integration

Reviews with admin moderation

🔐 Security

JWT authentication (cookie-based)

Role-based access control

Ownership validation

Centralized error handling

Stripe webhooks for payment verification

🏗️ Tech Stack
Technology	Usage
Node.js	Runtime
Express.js	Web framework
MongoDB	Database
Mongoose	ODM
JWT	Authentication
Stripe	Payments
Cloudinary	Image/Media storage
Multer	File uploads
📁 Backend Folder Structure
backend/
│
├── src/
│   ├── config/
│   │   ├── database/
│   │   ├── stripe/
│   │   └── cloudinary/
│   │
│   ├── models/
│   │   ├── user/
│   │   ├── destination/
│   │   ├── serviceProvider/
│   │   ├── service/
│   │   ├── booking/
│   │   ├── payment/
│   │   └── review/
│   │
│   ├── controllers/
│   │   ├── auth/
│   │   ├── destination/
│   │   ├── serviceProvider/
│   │   ├── service/
│   │   ├── booking/
│   │   ├── payment/
│   │   └── review/
│   │
│   ├── routes/
│   │   ├── auth/
│   │   ├── destination/
│   │   ├── serviceProvider/
│   │   ├── service/
│   │   ├── booking/
│   │   ├── payment/
│   │   └── review/
│   │
│   ├── middlewares/
│   │   ├── authentication/
│   │   ├── authorization/
│   │   ├── validation/
│   │   └── errorHandling/
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
└── README.md

🔄 Application Flow (High Level)

User registers & logs in

JWT token stored in HTTP-only cookie

User role determines access

Admin approves providers & services

Tourist creates booking

Payment handled via Stripe Checkout

Stripe webhook confirms payment

Booking status updated

Tourist leaves review

Admin moderates review

🔐 Authentication & Authorization

JWT stored in cookies

Middleware verifies token

Role-based middleware enforces access

Account status (pending, active, blocked) checked

💳 Payment Flow (Stripe)

Booking created (status: pending)

Checkout session created using booking amount

User completes Stripe payment

Stripe webhook verifies payment

Payment stored in DB

Booking updated to confirmed

Refunds handled by admin

🛡️ Admin Approval System
Service Provider
pending → active → blocked

Service
inactive → active → inactive

Booking
pending → confirmed → completed / cancelled

Review
pending → approved / rejected

📌 API Base URL
http://localhost:6500/api

🔗 Main API Endpoints (Overview)
Auth

POST /auth/register

POST /auth/login

GET /auth/me

POST /auth/logout

Destinations

GET /destinations

POST /destinations (admin)

PUT /destinations/:id (admin)

Service Providers

POST /providers

GET /providers (admin)

PUT /providers/:id/approve (admin)

Services

POST /services

GET /services

PUT /services/:id/status (admin)

Bookings

POST /bookings

GET /bookings/my

PUT /bookings/cancel/:id

PUT /bookings/admin/:id (admin)

Payments

POST /payments/checkout

POST /payments/webhook

POST /payments/refund (admin)

Reviews

POST /reviews

GET /reviews/service/:serviceId

PUT /reviews/:id/status (admin)

⚙️ Environment Variables (.env)
PORT=6500
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret

STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

FRONTEND_URL=http://localhost:3000

🧪 API Testing

Tested using Postman

Cookie-based auth supported

All role-based scenarios validated

Stripe webhook tested via Stripe CLI

🧠 Architecture Principles

MVC pattern

Separation of concerns

Secure-by-default design

Production-ready error handling

Scalable folder structure

🎤 Interview-Ready Summary

“This backend implements a secure, role-based tourism platform with admin moderation, Stripe payments, and scalable MVC architecture using Node.js and MongoDB.”

✅ Status

✔ Backend complete
✔ Tested with Postman
✔ Ready for frontend integration
✔ Production-ready architecture