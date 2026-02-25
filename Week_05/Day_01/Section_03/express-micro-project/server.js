/**
 * Express Micro Project: Simple Blog API
 * A minimal RESTful API for blog posts
 */

const express = require("express");
const morgan = require("morgan"); // HTTP request logger middleware
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json()); // function to parse JSON bodies
app.use(morgan("dev")); // log HTTP requests to the console
// a bunch of different middleware functions that we can use to handle requests and responses

// In-memory database
let posts = [
  {
    id: 1,
    title: "Getting Started with Express",
    content: "Express is a minimal web framework for Node.js...",
    author: "John Doe",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Understanding Middleware",
    content: "Middleware functions are the heart of Express...",
    author: "Jane Smith",
    createdAt: new Date().toISOString(),
  },
];

let nextId = 3;

// Helper function to find post by ID
function findPostById(id) {
  return posts.find((post) => post.id === parseInt(id));
}

// Validation middleware
function validatePost(req, res, next) {
  const { title, content } = req.body;

  if (!title || title.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: "Title is required",
    });
  }

  if (!content || content.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: "Content is required",
    });
  }

  next();
}

// ============================================
// ROUTES
// ============================================

// GET /posts - Get all posts
app.get("/posts", (req, res) => {
  const { author, search } = req.query;
  let filteredPosts = [...posts];

  // Filter by author if provided
  if (author) {
    filteredPosts = filteredPosts.filter((post) =>
      post.author.toLowerCase().includes(author.toLowerCase()),
    );
  }

  // Search in title and content if provided
  if (search) {
    const searchLower = search.toLowerCase();
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower),
    );
  }

  res.json({
    success: true,
    count: filteredPosts.length,
    data: filteredPosts,
  });
});

// GET /posts/:id - Get a specific post
app.get("/posts/:id", (req, res) => {
  const post = findPostById(req.params.id);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: `Post with ID ${req.params.id} not found`,
    });
  }

  res.json({
    success: true,
    data: post,
  });
});

// POST /posts - Create a new post
app.post("/posts", validatePost, (req, res) => {
  const { title, content, author } = req.body;

  const newPost = {
    id: nextId++,
    title: title.trim(),
    content: content.trim(),
    author: author || "Anonymous",
    createdAt: new Date().toISOString(),
  };

  posts.push(newPost);

  res.status(201).json({
    success: true,
    message: "Post created successfully",
    data: newPost,
  });
});

// PUT /posts/:id - Update a post
app.put("/posts/:id", validatePost, (req, res) => {
  const post = findPostById(req.params.id);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: `Post with ID ${req.params.id} not found`,
    });
  }

  // Update post fields
  post.title = req.body.title.trim();
  post.content = req.body.content.trim();
  if (req.body.author) {
    post.author = req.body.author.trim();
  }
  post.updatedAt = new Date().toISOString();

  res.json({
    success: true,
    message: "Post updated successfully",
    data: post,
  });
});

// DELETE /posts/:id - Delete a post
app.delete("/posts/:id", (req, res) => {
  const postIndex = posts.findIndex(
    (post) => post.id === parseInt(req.params.id),
  );

  if (postIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Post with ID ${req.params.id} not found`,
    });
  }

  const deletedPost = posts.splice(postIndex, 1)[0];

  res.json({
    success: true,
    message: "Post deleted successfully",
    data: deletedPost,
  });
});

// GET / - API information
app.get("/", (req, res) => {
  res.json({
    name: "Simple Blog API",
    version: "1.0.0",
    endpoints: {
      "GET /posts": "Get all posts (query params: ?author=name&search=term)",
      "GET /posts/:id": "Get a specific post",
      "POST /posts": "Create a new post",
      "PUT /posts/:id": "Update a post",
      "DELETE /posts/:id": "Delete a post",
    },
    example: {
      create: {
        method: "POST",
        url: "/posts",
        body: {
          title: "My Post Title",
          content: "Post content here",
          author: "Author Name",
        },
      },
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Blog API server running on http://localhost:${PORT}`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  GET    /`);
  console.log(`  GET    /posts`);
  console.log(`  GET    /posts/:id`);
  console.log(`  POST   /posts`);
  console.log(`  PUT    /posts/:id`);
  console.log(`  DELETE /posts/:id`);
  console.log(`\nPress Ctrl+C to stop the server\n`);
});
