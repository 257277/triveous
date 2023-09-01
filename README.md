# triveous assignment readme

## Table of Contents

- [Middleware: Hashing](#middleware-hashing)
- [Middleware: JWT Authentication](#middleware-jwt-authentication)
- [Routes: Cart Management](#routes-cart-management)
- [Routes: Category Management](#routes-category-management)
- [Routes: Order Management](#routes-order-management)
- [Routes: Product Management](#routes-product-management)
- [Routes: User Authentication](#routes-user-authentication)

## Middleware: Hashing (`hashing.js`)

The `hashing.js` middleware is responsible for securely hashing user passwords before storing them in the database. It utilizes the bcrypt library to achieve this. Here's how it works:

1. When a request is made to register a new user, this middleware hashes the plain text password provided in the request body.

2. It uses the bcrypt library to perform the hashing operation with a salt factor of 5.

3. If hashing is successful, the middleware replaces the plain text password with the hashed password in the request body.

This middleware is typically used during user registration to enhance password security.

