# Masala House Full-Stack Restaurant Application

Masala House is a responsive full-stack Indian restaurant web application built with React, Bootstrap, Node.js, Express, and MongoDB.

## Live Application

https://masala-house-react.vercel.app 

## Backend API

https://masala-house-backend.onrender.com 

## Features

- Responsive React interface
- Menu items retrieved from MongoDB
- Persistent shopping cart
- Add items and update quantities
- Remove individual quantities
- Clear the shopping cart
- Place customer orders
- Orders saved in MongoDB
- REST API supporting CRUD operations
- Mobile navigation and responsive layouts

## Technologies

### Frontend

- React
- Vite
- React Router
- Bootstrap
- JavaScript
- CSS

### Backend

- Node.js
- Express
- Mongoose
- CORS
- dotenv

### Database and Hosting

- MongoDB Atlas
- Vercel
- Render

## API Endpoints

### Menu

- `GET /api/menu`
- `POST /api/menu`
- `PUT /api/menu/:id`
- `DELETE /api/menu/:id`

### Cart

- `GET /api/cart/:cartId`
- `POST /api/cart/:cartId/items`
- `PATCH /api/cart/:cartId/items/:menuItemId`
- `DELETE /api/cart/:cartId/items/:menuItemId`
- `DELETE /api/cart/:cartId`

### Orders

- `GET /api/orders`
- `POST /api/orders`
- `PUT /api/orders/:id`
- `DELETE /api/orders/:id`

## Local Setup

### Frontend

```bash
npm install
npm run dev
