import http from "http";

const port = 3000;

const server = http.createServer((req, response) => {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(
    JSON.stringify({
      message: "Hello, World!",
      version: "1.0.0",
      author: "Godfather",
      description: "Corepackage Using API",
    })
  );
  console.log(`Request received at ${new Date()}`);
  response.end();
});
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
