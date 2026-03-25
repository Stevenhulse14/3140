const express = require("express");

const app = express();
// Middleware

const { userRoutes, postRoutes, productRoutes } = require("./routes");

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/products", productRoutes);

app.get("/health", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
