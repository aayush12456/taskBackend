Authentication and Authorization System

Features
Secure user registration, login, and logout.
Role-Based Access Control (RBAC): Admin, Moderator, and User roles with specific permissions.
JSON Web Tokens (JWT) for session management.
Passwords securely hashed using bcrypt.
Middleware for route protection based on roles.

Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT
Security: bcrypt, CORS

API Endpoints
POST /auth/register - Register a user
POST auth/login - User login
GET /auth/admin - Admin-only: View all users
Protected resources based on roles