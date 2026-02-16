# Indian Tourism Platform - Frontend

A modern, responsive React-based frontend application for an Indian Tourism Platform that connects tourists with travel service providers across India.

## Features

### Public Features
- **Home Page** - Landing page with featured destinations and services
- **Destinations** - Browse tourist destinations across India
- **Destination Details** - View detailed information about each destination
- **Services** - Explore available tourism services

### Authentication
- **Login** - Secure authentication for existing users
- **Register** - User registration with role selection (Tourist/Service Provider)

### Admin Dashboard
- **Dashboard** - Overview of platform statistics
- **Providers Management** - Manage service providers
- **Services Management** - Approve and manage tourism services
- **Bookings Management** - View and manage all bookings
- **Reviews Management** - Moderate user reviews

### Service Provider Dashboard
- **Dashboard** - Overview of own services and bookings
- **My Services** - List and manage own tourism services
- **Create Service** - Add new tourism services

### Tourist Features
- **My Bookings** - View booking history
- **Booking Details** - Detailed view of each booking
- **Write Review** - Submit reviews for completed bookings

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS + shadcn/ui
- **HTTP Client**: Axios
- **Data Fetching**: React Query
- **Form Handling**: React Hook Form
- **UI Components**: Lucide React, Radix UI

## Project Structure

```
Frontend/
├── public/                  # Static assets
├── src/
│   ├── API/                # API service files
│   │   ├── authApi.js
│   │   ├── bookingApi.js
│   │   ├── destinationApi.js
│   │   ├── paymentApi.js
│   │   ├── provider.js
│   │   ├── reviewApi.js
│   │   └── serviceApi.js
│   ├── assets/             # Images and static files
│   ├── components/         # Reusable components
│   │   └── Layout/        # Layout components
│   │       ├── DashboardLayout.jsx
│   │       ├── Footer.jsx
│   │       ├── Navbar.jsx
│   │       ├── PublicLayout.jsx
│   │       └── Sidebar.jsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.js
│   │   └── useRole.js
│   ├── lib/                # Utility libraries
│   ├── pages/              # Page components
│   │   ├── admin/          # Admin dashboard pages
│   │   ├── auth/           # Authentication pages
│   │   ├── provider/       # Provider dashboard pages
│   │   ├── public/         # Public pages
│   │   └── tourist/        # Tourist pages
│   ├── Routes/             # Route definitions
│   │   ├── AppRoutes.jsx
│   │   └── RouteGuards.jsx
│   ├── Store/              # Redux store
│   │   ├── authSlice.js
│   │   ├── rootReducer.js
│   │   └── store.js
│   ├── utils/              # Utility functions
│   │   ├── constants.js
│   │   ├── date.js
│   │   └── helpers.js
│   ├── App.jsx             # Main App component
│   ├── App.css             # Global styles
│   ├── index.css           # Index styles
│   └── main.jsx            # Entry point
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
└── eslint.config.js        # ESLint configuration
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```
bash
git clone <repository-url>
cd Frontend
```

2. Install dependencies:
```
bash
npm install
```

3. Create a `.env` file in the root directory:
```
env
VITE_API_BASE_URL=http://localhost:5000/api
```

4. Start the development server:
```
bash
npm run dev
```

5. Build for production:
```
bash
npm run build
```

## User Roles

### Admin
- Full access to platform management
- Manage service providers
- Approve/manage services
- View all bookings and reviews

### Service Provider
- Create and manage tourism services
- View bookings for their services
- Update service availability

### Tourist
- Browse destinations and services
- Book services
- View booking history
- Write reviews

## API Integration

The frontend expects a backend API running at the URL specified in `VITE_API_BASE_URL`. 

### Authentication Endpoints (Expected)
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/userProfile` - Get current user profile
- `POST /auth/logout` - User logout

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

---

Built with ❤️ for Indian Tourism
