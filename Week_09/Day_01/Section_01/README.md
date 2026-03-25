# Express server

In this section, we will learn how to create a simple Express server. We will also learn how to handle different routes and send responses to the client.

## Using Crud operations with Express

In this section, we will learn how to perform CRUD operations using Express. We will create a simple API that allows us to create, read, update, and delete data.

## Middleware in Express

In this section, we will learn about middleware in Express. We will learn how to use middleware to handle requests and responses, and how to create our own middleware functions.

## Error handling in Express

In this section, we will learn how to handle errors in Express. We will learn how to create error-handling middleware and how to use it to catch and handle errors in our application.

## using index.js file in Express

In this section, we will learn how to use an `index.js` file in our Express application. We will learn how to organize our code and how to use the `index.js` file to handle importing and exporting modules in our application.

example of `index.js` file in Express:

```javascript
// index.js (entry point)
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Error-handling middleware (must be defined last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
```

Example of how to use a barrel `index.js` to import and re-export multiple modules from a folder:

```javascript
// routes/index.js  (barrel file)
const userRoutes = require("./users");
const postRoutes = require("./posts");
const productRoutes = require("./products");

module.exports = {
  userRoutes,
  postRoutes,
  productRoutes,
};
```

Then in your main `index.js` you can import them cleanly:

```javascript
// index.js (entry point using barrel file)
const { userRoutes, postRoutes, productRoutes } = require("./routes");

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/products", productRoutes);
```

## Project Structure

A recommended folder structure for an Express application:

```
project/
├── index.js            # Entry point
├── package.json
├── routes/
│   ├── index.js        # Barrel file — re-exports all routes
│   ├── users.js        # User routes
│   └── posts.js        # Post routes
├── controllers/
│   ├── userController.js
│   └── postController.js
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
└── models/
    ├── userModel.js
    └── postModel.js
```

## Quick Reference: Common Express Patterns

### Basic CRUD Route Example

```javascript
const express = require("express");
const router = express.Router();

let items = []; // in-memory store

// READ all
router.get("/", (req, res) => {
  res.status(200).json(items);
});

// READ one
router.get("/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: "Not found" });
  res.status(200).json(item);
});

// CREATE
router.post("/", (req, res) => {
  const newItem = { id: Date.now(), ...req.body };
  items.push(newItem);
  res.status(201).json(newItem);
});

// UPDATE
router.put("/:id", (req, res) => {
  const index = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Not found" });
  items[index] = { id: items[index].id, ...req.body };
  res.status(200).json(items[index]);
});

// DELETE
router.delete("/:id", (req, res) => {
  const index = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Not found" });
  const deleted = items.splice(index, 1);
  res.status(200).json(deleted[0]);
});

module.exports = router;
```

### Custom Middleware Example

```javascript
// middleware/logger.js
const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // always call next() to pass control to the next middleware
};

module.exports = logger;
```

Usage in `index.js`:

```javascript
const logger = require("./middleware/logger");
app.use(logger);
```

## Setup

```bash
# Initialize project
npm init -y

# Install Express
npm install express

# Run the server
node index.js
```
