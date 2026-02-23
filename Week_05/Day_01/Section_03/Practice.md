# Building a Basic API with Middleware - Complete Walkthrough

## Introduction

In this guide, we'll build a simple Express.js API from scratch. We'll learn about **middleware**, which is one of the most important concepts in web development. Middleware functions are code that runs between receiving a request and sending a response.

Think of middleware like a security checkpoint or quality control station:

- A request comes in
- Middleware inspects it, modifies it, or validates it
- Middleware either passes it along or stops it
- Eventually, your route handler processes it
- A response goes back

---

## What is Middleware?

Middleware is a function that has access to:

- **req**: The incoming request object
- **res**: The response object used to send back data
- **next**: A function that calls the next middleware in the chain

**Middleware signature:**

```javascript
const myMiddleware = (req, res, next) => {
  // Do something here
  next(); // Pass control to the next middleware
};
```

**Key Rule**: If you don't call `next()`, the request stops and never reaches your route handler!

---

## Step-by-Step: Building Your First API

### Step 1: Initialize Your Project

Create a new directory and initialize Node.js:

```bash
mkdir my-first-api
cd my-first-api
npm init -y
```

This creates a `package.json` file with default settings.

### Step 2: Install Express

Express is a popular web framework for Node.js that makes building APIs easy:

```bash
npm install express
```

This adds Express to your `node_modules` folder and updates `package.json`.

### Step 3: Create Your Server File

Create a file called `server.js`:

```javascript
// Import Express - this gives us the framework
const express = require("express");

// Create an Express application
const app = express();

// Define the port where our server will listen
const PORT = 3000;

// ==========================================
// MIDDLEWARE SECTION
// ==========================================

// Built-in Middleware: Parse JSON
// This middleware automatically converts incoming JSON data into JavaScript objects
// Without this, req.body would be undefined
app.use(express.json());

// Custom Middleware: Logging Middleware
// This runs on EVERY request before it reaches the route handler
// It logs information about each request to the console
const loggingMiddleware = (req, res, next) => {
  console.log("------- REQUEST RECEIVED -------");
  console.log(`Time: ${new Date().toLocaleTimeString()}`);
  console.log(`Method: ${req.method}`); // GET, POST, PUT, DELETE, etc.
  console.log(`URL: ${req.url}`); // The path requested
  console.log(`Body:`, req.body); // The data sent in the request
  console.log("--------------------------------");

  // IMPORTANT: Call next() to pass control to the next middleware
  next();
};

// Register the logging middleware - it will run on all routes
app.use(loggingMiddleware);

// Custom Middleware: Validation Middleware (for POST/PUT requests)
// This middleware checks if the request body has required data
// It only applies to specific routes
const validateUserData = (req, res, next) => {
  // Check if the request body exists
  if (!req.body || Object.keys(req.body).length === 0) {
    // If no data, send an error response and STOP here (don't call next())
    return res.status(400).json({
      error: "Request body is empty. Please send user data.",
    });
  }

  // Check if the name field exists
  if (!req.body.name) {
    // If name is missing, send an error and STOP
    return res.status(400).json({
      error: "Name field is required.",
    });
  }

  // Check if the email field exists
  if (!req.body.email) {
    // If email is missing, send an error and STOP
    return res.status(400).json({
      error: "Email field is required.",
    });
  }

  // If all validations pass, call next() to continue to the route handler
  next();
};

// Custom Middleware: Authentication Check
// In a real app, this would verify a token. For practice, we'll just check for a header.
const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    // No authorization header? Send error and STOP
    return res.status(401).json({
      error: "Unauthorized: Missing authorization header",
    });
  }

  // If authorization header exists, attach some data to req for later use
  req.user = { authenticated: true, timestamp: new Date() };

  console.log("✓ User authenticated");
  next();
};

// ==========================================
// ROUTES SECTION
// ==========================================

// Root Route - Simple GET request
// This has NO middleware applied to it (except the global ones)
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to My First API!",
    endpoints: {
      "GET /": "This message",
      "GET /users": "Get all users",
      "POST /users": "Create a new user (requires: name, email)",
      "GET /users/:id": "Get a specific user by ID",
      "PUT /users/:id": "Update a user (requires: name, email)",
      "DELETE /users/:id": "Delete a user",
    },
  });
});

// In-memory database (just an array for practice)
// In a real app, this would be a database like MongoDB or PostgreSQL
let users = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com" },
  { id: 2, name: "Bob Smith", email: "bob@example.com" },
  { id: 3, name: "Carol White", email: "carol@example.com" },
];

// GET /users - Retrieve all users
app.get("/users", (req, res) => {
  res.json({
    success: true,
    count: users.length,
    data: users,
  });
});

// GET /users/:id - Retrieve a specific user by ID
// The :id is a parameter that can be accessed via req.params.id
app.get("/users/:id", (req, res) => {
  // Find the user with the matching ID
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) {
    // User not found
    return res.status(404).json({
      error: `User with ID ${req.params.id} not found`,
    });
  }

  res.json({
    success: true,
    data: user,
  });
});

// POST /users - Create a new user
// This route has TWO middleware applied:
// 1. validateUserData - checks if required fields exist
// 2. checkAuth - checks if authorization header is present
// Both must pass before the route handler executes
app.post("/users", validateUserData, checkAuth, (req, res) => {
  // Create a new user object
  // Find the highest ID and add 1 to create a new unique ID
  const newUser = {
    id: Math.max(...users.map((u) => u.id), 0) + 1,
    name: req.body.name,
    email: req.body.email,
  };

  // Add the new user to our array
  users.push(newUser);

  // Send back the created user with a 201 (Created) status code
  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: newUser,
  });
});

// PUT /users/:id - Update an existing user
// This also requires both validation and authentication middleware
app.put("/users/:id", validateUserData, checkAuth, (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({
      error: `User with ID ${req.params.id} not found`,
    });
  }

  // Update the user's data
  user.name = req.body.name;
  user.email = req.body.email;

  res.json({
    success: true,
    message: "User updated successfully",
    data: user,
  });
});

// DELETE /users/:id - Delete a user
app.delete("/users/:id", checkAuth, (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));

  if (userIndex === -1) {
    return res.status(404).json({
      error: `User with ID ${req.params.id} not found`,
    });
  }

  // Remove the user from the array
  const deletedUser = users.splice(userIndex, 1);

  res.json({
    success: true,
    message: "User deleted successfully",
    data: deletedUser[0],
  });
});

// ==========================================
// ERROR HANDLING
// ==========================================

// 404 - Route not found
// This runs if no other route matches
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    requested: `${req.method} ${req.url}`,
  });
});

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log(`✓ Server is running on http://localhost:${PORT}`);
  console.log(`✓ Press Ctrl+C to stop the server`);
});
```

### Step 4: Update package.json

Add a script to make starting easier. Open `package.json` and add this to the `scripts` section:

```json
"scripts": {
  "start": "node server.js",
  "dev": "node server.js"
}
```

Now you can start your server with:

```bash
npm start
```

---

## Testing Your API

### Option 1: Using curl (Command Line)

```bash
# GET all users
curl http://localhost:3000/users

# GET a specific user
curl http://localhost:3000/users/1

# POST - Create a new user (WILL FAIL - no authorization header)
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"David Lee","email":"david@example.com"}'

# POST - Create a new user (SUCCESS - with authorization)
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer token123" \
  -d '{"name":"David Lee","email":"david@example.com"}'

# PUT - Update a user
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer token123" \
  -d '{"name":"Alice Updated","email":"alice.new@example.com"}'

# DELETE a user
curl -X DELETE http://localhost:3000/users/1 \
  -H "Authorization: Bearer token123"
```

### Option 2: Using Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Create a new request
3. Select the method (GET, POST, etc.)
4. Enter the URL: `http://localhost:3000/users`
5. Add headers in the "Headers" tab
6. Add body data in the "Body" tab (select "JSON")
7. Click "Send"

### Option 3: Using VS Code REST Client

Install the "REST Client" extension in VS Code, then create a file called `test.http`:

```http
### Get all users
GET http://localhost:3000/users

### Get user with ID 1
GET http://localhost:3000/users/1

### Create a new user (will fail)
POST http://localhost:3000/users
Content-Type: application/json

{
  "name": "David Lee",
  "email": "david@example.com"
}

### Create a new user (will succeed)
POST http://localhost:3000/users
Content-Type: application/json
Authorization: Bearer token123

{
  "name": "David Lee",
  "email": "david@example.com"
}

### Update user 1
PUT http://localhost:3000/users/1
Content-Type: application/json
Authorization: Bearer token123

{
  "name": "Alice Updated",
  "email": "alice.new@example.com"
}

### Delete user 1
DELETE http://localhost:3000/users/1
Authorization: Bearer token123
```

---

## Understanding the Middleware Flow

### Example: POST /users with Data

Here's what happens step-by-step:

```
1. Request arrives: POST /users with body {"name":"Test","email":"test@example.com"}

2. loggingMiddleware runs
   ✓ Logs the request details
   ✓ Calls next() → Continue to next middleware

3. validateUserData middleware runs
   ✓ Checks if body exists → Yes ✓
   ✓ Checks if name exists → Yes ✓
   ✓ Checks if email exists → Yes ✓
   ✓ Calls next() → Continue to next middleware

4. checkAuth middleware runs
   ✓ Checks for Authorization header → Must exist!
   ✓ If exists: Calls next() → Continue to route handler
   ✓ If missing: Sends error response, stops here!

5. Route handler executes (if all middleware passed)
   ✓ Creates new user
   ✓ Sends response
```

### Example: POST /users WITHOUT Authorization Header

```
1. loggingMiddleware runs ✓ calls next()
2. validateUserData runs ✓ calls next()
3. checkAuth runs
   ✗ No Authorization header found!
   ✗ Sends 401 error response
   ✗ STOPS - Route handler never executes!
```

---

## Key Middleware Concepts to Remember

| Concept                      | Explanation                                                           |
| ---------------------------- | --------------------------------------------------------------------- |
| **Middleware runs in order** | Top to bottom, in the order you write them                            |
| **Always call next()**       | Unless you want to stop and send a response                           |
| **Middleware on routes**     | `app.post('/path', middleware1, middleware2, handler)`                |
| **Global middleware**        | `app.use(middleware)` runs on all routes                              |
| **req.body**                 | Contains data sent in the request (JSON)                              |
| **req.params**               | Contains URL parameters like `:id`                                    |
| **req.headers**              | Contains HTTP headers like Authorization                              |
| **Status codes**             | 200=OK, 201=Created, 400=Bad Request, 401=Unauthorized, 404=Not Found |

---

## Challenge Exercises

Try these to practice:

1. **Add a timestamp middleware** that adds the current time to each response
2. **Add an age field** to users and create validation middleware for it
3. **Add a "lastUpdated" field** that records when a user was last modified
4. **Create a rate limiting middleware** that only allows 10 requests per minute
5. **Add CORS middleware** to allow requests from different domains

---

## Next Steps

Once you understand this basic API:

1. **Add a real database** - Replace the `users` array with MongoDB or PostgreSQL
2. **Add JWT authentication** - Create secure tokens instead of checking headers
3. **Add error handling middleware** - Catch and handle errors gracefully
4. **Add data validation** - Use libraries like `joi` for complex validation
5. **Add CORS** - Allow requests from frontend applications
6. **Deploy it** - Put your API on the internet with Heroku, AWS, or Vercel

---

## Troubleshooting

| Problem                        | Solution                                                             |
| ------------------------------ | -------------------------------------------------------------------- |
| "Cannot find module 'express'" | Run `npm install express`                                            |
| "Port 3000 already in use"     | Change PORT to 3001, 3002, etc., or kill the process using port 3000 |
| "req.body is undefined"        | Make sure `app.use(express.json())` is at the TOP of your middleware |
| "Route not working"            | Check spelling, HTTP method, and that server is running              |
| "Middleware not running"       | Make sure you called `next()` in the previous middleware             |

Happy coding! 🚀
