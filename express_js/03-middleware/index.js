import express from "express";

const app = express();

// 1 Built-in middleware (runs for every request)
app.use(express.json());

// 2 Custom middleware (request logger)
app.use((req, res, next) => {
  console.log("Request received:", req.method, req.url);
  next(); // move to next step
});

// 3 Route
app.post("/users", (req, res, next) => {
  try {
    // 4 Controller logic
    const user = req.body;

    if (!user.name) {
      // send error to error middleware
      throw new Error("Name is required");
    }

    // 5 Business logic / DB simulation
    const savedUser = {
      id: 1,
      name: user.name
    };

    // 6 Send response
    res.status(201).json({
      message: "User created",
      data: savedUser
    });

  } catch (err) {
    next(err); // jump to error middleware
  }
});

// 7 Global error-handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message
  });
});

// 8 Server start
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
