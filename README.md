# Triveous assignment readme

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


## Middleware: JWT Authentication (`auth.js`)

The `auth.js` middleware handles JSON Web Token (JWT) authentication to protect routes that require authentication and authorization. Here's how it functions:

1. It checks if a valid JWT is included in the request headers, typically in the "Authorization" header.

2. If no token is provided, it responds with a 401 Unauthorized status and a message.

3. If a valid token is present, it decodes the token to extract the user's information, including their user ID.

4. It then checks if the user exists in the database and is authorized to access the protected route.

5. If the user is authorized, it adds the user's ID to the request body and allows the request to continue.

This middleware is used to secure routes that require user authentication.

## Routes: Cart Management (`cartRoute.js`)

The `cartRoute.js` file defines routes related to managing a shopping cart. These routes include:

- `/additem`: Adds an item to the cart.
- `/cartItem`: Retrieves the items in the cart.
- `/updateQuantity/:id`: Updates the quantity of a cart item.
- `/deleteItem/:id`: Deletes an item from the cart.

Authentication using the JWT middleware (`auth.js`) is required to access these routes. Cart-related operations, such as adding, retrieving, updating, and deleting items, are handled in these routes.

## Routes: Category Management (`cateRoute.js`)

The `cateRoute.js` file defines routes for managing product categories. Specifically, it includes:

- `/listing`: Adds a new category if it doesn't already exist.

This route allows users to add new categories, ensuring that duplicates are not created in the database.

## Routes: Order Management (`orderRoute.js`)

The `orderRoute.js` file defines routes related to order management. These routes include:

- `/placeorder`: Places an order with items from the user's cart.
- `/orderhistory`: Retrieves the order history of a particular user.
- `/orderdetail/:id`: Retrieves details of a specific order by ID.

To access these routes, users must be authenticated using JWT authentication (`auth.js`). These routes facilitate the placement of orders, viewing order history, and fetching order details.

## Routes: Product Management (`productRoute.js`)

The `productRoute.js` file defines routes for managing products. These routes include:

- `/listing`: Adds a new product if it doesn't already exist.
- `/details/:id`: Retrieves details of a specific product by ID.

These routes allow users to add new products and retrieve product details, ensuring that duplicate products are not created in the database.

## Routes: User Authentication (`userRoute.js`)

The `userRoute.js` file defines routes for user authentication, including registration and login. These routes include:

- `/register`: Registers a new user.
- `/login`: Authenticates a user based on email and password.

Password hashing middleware (`hashing.js`) is used to securely hash passwords during registration. JWT tokens are generated during login to authenticate users for protected routes.

