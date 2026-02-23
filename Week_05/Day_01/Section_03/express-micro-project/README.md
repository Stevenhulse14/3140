# Express Micro Project: Simple Blog API

## Overview

A minimal RESTful API for a blog application built with Express.js. This micro project demonstrates core Express concepts including routing, middleware, and request handling.

## Features

- CRUD operations for blog posts
- Request validation
- Error handling
- JSON responses
- Simple in-memory storage

## Installation

```bash
npm init -y
npm install express
```

## How to Run

```bash
node server.js
```

The server will start on `http://localhost:3000`

## API Endpoints

- `GET /posts` - Get all blog posts
- `GET /posts/:id` - Get a specific post
- `POST /posts` - Create a new post
- `PUT /posts/:id` - Update a post
- `DELETE /posts/:id` - Delete a post

## Example Requests

### Create a post
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{"title": "My First Post", "content": "This is the content"}'
```

### Get all posts
```bash
curl http://localhost:3000/posts
```

### Get a specific post
```bash
curl http://localhost:3000/posts/1
```

## Learning Objectives

- Building RESTful APIs with Express
- Handling HTTP methods (GET, POST, PUT, DELETE)
- Working with route parameters
- Request body parsing
- Error handling patterns
