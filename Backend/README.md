# 🧳 Indian Tourism Backend API

A scalable, production-ready backend for an **Indian Tourism Platform**, built using **Node.js, Express, MongoDB**, with secure authentication, role-based authorization, Stripe payments, and Cloudinary media storage.

---

## 🚀 Project Overview

This backend powers a tourism platform supporting:

* 👤 **Tourists**
* 🏢 **Service Providers**
* 🛡️ **Admin Moderation**

The system implements secure authentication, structured approval workflows, payment processing, and booking lifecycle management.

---

## 🏗️ Tech Stack

| Technology | Purpose             |
| ---------- | ------------------- |
| Node.js    | Runtime environment |
| Express.js | Web framework       |
| MongoDB    | Database            |
| Mongoose   | ODM                 |
| JWT        | Authentication      |
| Stripe     | Payment processing  |
| Cloudinary | Media storage       |
| Multer     | File uploads        |

---

## 👥 Role-Based System

### 🧳 Tourist

* Browse destinations
* Book services
* Make payments via Stripe
* Write reviews

### 🏢 Service Provider

* Register & onboard
* Create services (after admin approval)
* Manage bookings

### 🛡️ Admin

* Approve providers
* Approve services
* Moderate reviews
* Manage bookings
* Handle refunds

---

## 🔐 Authentication & Authorization

* JWT-based authentication
* Token stored in **HTTP-only cookies**
* Role-based middleware enforcement
* Account status validation:

  * `pending`
  * `active`
  * `blocked`

---

## 💳 Stripe Payment Flow

1. Tourist creates booking → `status: pending`
2. Stripe Checkout session created
3. User completes payment
4. Stripe webhook verifies payment
5. Payment stored in database
6. Booking updated to `confirmed`
7. Admin can process refunds

---

## 🛡️ Admin Approval Workflow

### Service Provider

```
pending → active → blocked
```

### Service

```
inactive → active → inactive
```

### Booking

```
pending → confirmed → completed / cancelled
```

### Review

```
pending → approved / rejected
```

---

## 📁 Folder Structure

```
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
```

---

## 📌 API Base URL

```
http://localhost:6500/api
```

---

## 🔗 Main API Endpoints

### 🔐 Auth

```
POST   /auth/register
POST   /auth/login
GET    /auth/me
POST   /auth/logout
```

### 🗺️ Destinations

```
GET    /destinations
POST   /destinations           (admin)
PUT    /destinations/:id       (admin)
```

### 🏢 Service Providers

```
POST   /providers
GET    /providers              (admin)
PUT    /providers/:id/approve  (admin)
```

### 🛎️ Services

```
POST   /services
GET    /services
PUT    /services/:id/status    (admin)
```

### 📅 Bookings

```
POST   /bookings
GET    /bookings/my
PUT    /bookings/cancel/:id
PUT    /bookings/admin/:id     (admin)
```

### 💳 Payments

```
POST   /payments/checkout
POST   /payments/webhook
POST   /payments/refund        (admin)
```

### ⭐ Reviews

```
POST   /reviews
GET    /reviews/service/:serviceId
PUT    /reviews/:id/status     (admin)
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```
PORT=6500
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret

STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

FRONTEND_URL=http://localhost:3000
```

---

## 🧪 Testing

* Tested using **Postman**
* Cookie-based authentication supported
* Role-based flows validated
* Stripe webhook tested via **Stripe CLI**

---

## 🧠 Architecture Principles

* MVC pattern
* Separation of concerns
* Modular folder structure
* Centralized error handling
* Secure-by-default configuration
* Production-ready design

---

## 🚀 Installation & Setup

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 🎤 Interview-Ready Summary

> This backend implements a secure, role-based tourism platform with admin moderation, Stripe payments, booking lifecycle management, and scalable MVC architecture using Node.js, Express, and MongoDB.

---

## ✅ Project Status

* ✔ Backend Complete
* ✔ Fully Tested
* ✔ Stripe Integrated
* ✔ Admin Moderation Implemented
* ✔ Ready for Frontend Integration
* ✔ Production-Ready Architecture

---

## 📄 License

This project is licensed under the MIT License.
