# E-Commerce Backend (Node + Express + MongoDB)

1. `npm install`
2. Edit `.env` (MongoDB URI and JWT secret)
3. `npm run dev`  -> http://localhost:5000

To make an admin: register a user, then in MongoDB set `role: "admin"` for that user.
Add products with POST /api/products (admin token required).
