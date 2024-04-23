# E-commerce Node.js Web API

This repository contains the source code for an E-commerce web API built using Node.js.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (signup, login, logout)
- CRUD operations for products, categories, and orders
- Authorization for different user roles (admin, customer)
- Pagination and filtering for product listing
- Secure password hashing using bcrypt
- Error handling and validation using Express middleware

## Installation

1. Clone the repository:

```bash
git clone https://github.com/MohamedAbdou2/E-commerce_nodejs_webapi.git
```

## Install dependencies
```bash
cd E-commerce_nodejs_webapi
npm install
```

## Configure environment variables:
Create a .env file in the root directory
Define environment variables like PORT, DB_URI, JWT_SECRET, etc.

## Start the server
```bash
npm start
```
## Usage

Once the server is running, you can access the API endpoints using tools like Postman or by integrating them into your frontend application.

## API Endpoints

The following are the available API endpoints:

- `POST /api/auth/signup`: Create a new user account.
- `POST /api/auth/login`: Authenticate and generate a JWT token.
- `POST /api/auth/logout`: Logout the user and invalidate the token.
- `GET /api/products`: Get a list of all products.
- `POST /api/products`: Create a new product.
- `GET /api/products/:id`: Get details of a specific product.
- `PUT /api/products/:id`: Update details of a specific product.
- `DELETE /api/products/:id`: Delete a specific product.
- `GET /api/categories`: Get a list of all categories.
- `POST /api/categories`: Create a new category.
- `GET /api/orders`: Get a list of all orders.
- `POST /api/orders`: Create a new order.
