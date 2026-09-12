# User Management B2C — Front End
 
An admin dashboard for managing **users** and **B2C customers**, built with React, Vite, Tailwind CSS, and Material Tailwind. It provides authentication, a users CRUD panel, a customers panel (with Azure AD B2C–style profile attributes), and a stats dashboard backed by a REST API.
 
This project started from the [Material Tailwind Dashboard React](https://www.creative-tim.com/product/material-tailwind-dashboard-react) template and was extended with custom authentication, user management, and customer management features.
 
## Features
 
- **Authentication** — Sign in / sign up pages, JWT stored in a cookie (`access_token`), and route protection via a `ProtectedRoute` wrapper.
- **User management** (`/dashboard/users`) — List, search, create, edit, delete users, and trigger password resets. New users get an auto-generated password shown on creation.
- **Customer management** (`/dashboard/customers`) — Manage B2C customer records (part number, contract, ID number, type, sign-in names, etc.) with create, update, and password-reset actions.
- **Dashboard overview** (`/dashboard/home`) — Stat cards and charts (via ApexCharts) summarizing customer counts (this year, last year, last month, past 12 months) and breakdown by type.
- **Profile, notifications, and tables pages** carried over from the base admin template.
- **Themeable UI** — Sidebar/navbar configurator for switching sidenav color and layout, powered by a React context/reducer.
## Tech Stack
 
- **React 18** + **Vite** — app tooling and dev server
- **Tailwind CSS** + **@material-tailwind/react** — styling and UI components
- **React Router v6** — routing, including a `/dashboard/*` and `/auth/*` layout split
- **Axios** / **fetch** — API calls
- **js-cookie**, **react-cookie**, **universal-cookie** — cookie-based session storage
- **jwt-decode** — decoding the access token
- **ApexCharts** (`react-apexcharts`) — dashboard charts
- **Heroicons** — icon set
## Prerequisites
 
- Node.js (LTS recommended)
- A running backend API exposing the endpoints listed below (not included in this repo)
## Getting Started
 
```bash
# install dependencies
npm install
 
# start the dev server
npm run dev
 
# build for production
npm run build
 
# preview the production build
npm run preview
```
 
## Backend API
 
The front end expects a REST API. **The base URL is currently hardcoded to `http://localhost:3000`** in `src/services/*.jsx` and `src/pages/auth/sign-in.jsx` — update these if your API runs elsewhere.
 
Expected endpoints:
 
| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/auth/login` | Authenticate and return an access token |
| GET | `/user/` | List users (supports query params for search) |
| POST | `/user/new` | Create a user |
| PATCH | `/user/:id` | Update a user |
| DELETE | `/user/:id` | Delete a user |
| POST | `/user/reset-password/:email` | Reset a user's password |
| GET | `/customer` | List customers |
| POST | `/customer/new` | Create a customer |
| PATCH | `/customer/:objectId` | Update a customer |
| PATCH | `/customer/reset-password/:objectId` | Reset a customer's password |
| GET | `/customer/lastyear` | Customer count, last year |
| GET | `/customer/thisyear` | Customer count, this year |
| GET | `/customer/LastMonth` | Customer count, last month |
| GET | `/customer/pastyear` | Customer counts, past 12 months |
| GET | `/customer/type` | Customer breakdown by type |
 
## Project Structure
 
```
├── public/
│   ├── css/                # compiled Tailwind CSS
│   └── img/                # static images / logos
├── src/
│   ├── configs/            # ApexCharts config
│   ├── context/            # global UI state (sidenav, navbar, configurator)
│   ├── data/                # static/sample data for tables and charts
│   ├── layouts/             # "dashboard" and "auth" layout shells
│   ├── pages/
│   │   ├── auth/            # sign-in, sign-up
│   │   └── dashboard/       # home, profile, tables, notifications, users, customers
│   ├── services/            # API calls: auth, users, customers
│   ├── utils/               # ProtectedRoute
│   ├── widgets/              # reusable cards, charts, layout pieces (navbar, sidenav, footer, configurator)
│   ├── App.jsx
│   ├── main.jsx
│   └── routes.jsx
├── index.html
├── tailwind.config.cjs
└── vite.config.js
```
