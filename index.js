import express from "express";

const app = express();

const port = 3000;

app.get("/api/hello", (req, res) => {
  res.json({
    message: "Hello, World!",
    timestamp: new Date().toISOString(),
  });
});
app.get("/api/user", (req, res) => {
  res.json({
    message: "Hello, World!",
    timestamp: new Date().toISOString(),
  });
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong." });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
