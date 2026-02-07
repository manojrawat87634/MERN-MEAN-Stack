import express from "express";

app.use(express.json()); // to read JSON body

// GET
app.get("/users", (req, res) => {
  res.send("Get all users");
});

// POST
app.post("/users", (req, res) => {
  const user = req.body;
  res.send(`User created: ${JSON.stringify(user)}`);
});

// PUT
app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  res.send(`User with id ${id} updated`);
});

// DELETE
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  res.send(`User with id ${id} deleted`);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
