# eshop - Online Shop

![JavaScript Logo](https://img.shields.io/badge/JavaScript-yellow?logo=javascript&logoColor=white)
![React Logo](https://img.shields.io/badge/React-black?logo=react)
![Vite Logo](https://img.shields.io/badge/Vite-black?logo=vite)
![Tailwind Logo](https://img.shields.io/badge/Tailwind_CSS-black?logo=tailwindcss)
![Nodejs Logo](https://img.shields.io/badge/Nodejs-green?logo=node.js&logoColor=white)
![Express Logo](https://img.shields.io/badge/Express-black?logo=express)
![MongoDB Logo](https://img.shields.io/badge/MongoDB-success?logo=mongodb&logoColor=white)

Eshop is an online shopping platform designed for both customers and administrators. Customers can browse products, shop, and track their orders. Meanwhile, administrators and shop owners can manage the catalog by adding, editing, or updating products, as well as managing and updating customer order statuses."

## Demo
<img width="448" height="330" alt="01" src="https://github.com/user-attachments/assets/262b9a23-ddd4-428e-8661-5f57264e03b9" />
<img width="448" height="330" alt="02" src="https://github.com/user-attachments/assets/7481f8d1-8ab1-464d-8a11-d12ed596c2b8" />
<img width="448" height="330" alt="03" src="https://github.com/user-attachments/assets/c4cd926f-9138-43df-8313-d5f46a5cce7b" />
<img width="448" height="330" alt="04" src="https://github.com/user-attachments/assets/787f9eec-4126-488e-89ed-ebeea0610641" />
<img width="448" height="330" alt="05" src="https://github.com/user-attachments/assets/fd50e617-4f40-471e-be73-192d5c8f56a2" />
<img width="448" height="330" alt="06" src="https://github.com/user-attachments/assets/603af6c7-d433-4a9a-9c94-558a3645b65f" />
<img width="448" height="330" alt="07" src="https://github.com/user-attachments/assets/bb5f28ed-c57e-49c6-b652-1186450a699b" />
<img width="448" height="330" alt="08" src="https://github.com/user-attachments/assets/87202747-9f4a-441e-9104-32d8c38cd490" />
<img width="448" height="330" alt="09" src="https://github.com/user-attachments/assets/bf9f4207-498f-40ae-885f-f6f6801bc756" />


Link for the website **https://eshop-anchithab.netlify.app/**

for testing can use

```text
Email: test@test.com
Password: test@test.com

admin
Email: admin@admin.com
Password: admin1234
```

## Features

- **Authentication** - Secure user login and registration by **JSON Web Tokens (JWT)**, Password are hashed before stored in the database, and authentication tokens are stored in **HttpOnly cookies**.
- **Database** - MongoDB for storing users, products, orders data.
- **Frontend** - Responsive UI buit with JavaScript, React, and TailwindCSS.
- **Backend** - Node.js + Express handles authentication, and data management.

---

## Tech Stack

- Language: JavaScript
- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB, Mongoose
- Authentication: JWT, HttpOnly Cookies, bcrypt
- API Requests: Fetch API
- Deployment: Netlify (Frontend), Render (Backend)

---

## Quick Start

### Prerequisites

- Node.js
- MongoDB: Local installation or MongoDB Atlas account

### Installation

```text
#Clone the repository
git clone https://github.com/mongmongg/e.shop.git

#Install backend dependencies
cd e.shop/backend
npm install

#Install frontend dependencies
cd ../frontend
npm install
```

**Update .env with your configuration**

- Database URL

**Development**

Backend:

```text
cd backend && npm run dev
```

Frontend:

```text
cd frontend && npm run dev
```

## Repository Structure

#### Repository Structure

```text
e.shop/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page-level components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── utils/      # Fetch API handling logic
│   │   ├── store/      # Redux store setup
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/    # Handles incoming request logic
│   ├── data/           # Database connection configuration
│   ├── middlewares/    # Middleware configuration (CORS and Multer)
│   ├── models/         # Defines database Mongoose schemas
│   ├── routes/         # Defines REST API endpoints
│   ├── upload/        # Handles images file storage
│   ├── util/           # Utility and helper functions
│   ├── .env
│   ├── package.json
│   └── app.js
│
├── .gitignore
└── README.md
```

## Architecture Overview

**Frontend**

- Built with JavaScript + React + Tailwind CSS
- Connects to backend API for authentication and data retrieval and management.

**Backend**

- Built with Node.js + Express
- Handles authentication using JWT and bcrypt for hashing password and database read/write via Mongoose.

**Database**

- MongoDB + Mongoose stores and manage user accounts, products and orders data.

#### Example API Endpoint

**User Routes**
|Endpoint|Method|Description|
|-----------|---------|--------------|
| /checkAuth|GET| Verifies user's active session token|
|/signin|POST| Authenticates an existing user|
|/signup|POST|Regiters a new user|
|/logout|POST| Terminates session and clears active cookies|

**Admin Routes**
|Endpoint|Method|Description|
|-----------|---------|--------------|
|/admin/orders|POST|Retrieve all customer orders|
|/admin/updateOrder|PATCH|Modifies a specific order's status|
|/admin/product|POST|Add a new product|
|/admin/product/:pId/edit|PATCH|Modifies details of an existing product|

**Product Routes**
|Endpoint|Method|Description|
|-----------|---------|--------------|
|/products|GET|Retrieve products data|
|/products/detail/:id|GET|Retrieve product data by ID|

**Cart Routes**
|Endpoint|Method|Description|
|-----------|---------|--------------|
|/cart|GET|Retrieve user's cart data|
|/cart/items|POST|Modifies item quantities|
|/cart/checkout|POST|Create a Stripe session and redirect for payment|

**Order Routes**
|Endpoint|Method|Description|
|-----------|---------|--------------|
|/order|GET|Retrieve order histories|
|/order/payment/complete|POST|Updates order status when proceeded Stripe payment|

**Environment Variables**
|Variables|Description|
|------------|--------------|
|VITE_APP_BACKEND_URL|Backend URL|
|TOKEN_KEY|JSON Web Token secret key|
|PORT| Backend port (default:3000)|
|DATABASE| MongoDB project URL|
