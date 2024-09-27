import http from "http"; // Import the built-in HTTP module

// Define the port on which the server will run
const port = 3000;

// Create an HTTP server
const server = http.createServer((req, response) => {
  // Set the response header to indicate a successful request with JSON content
  response.writeHead(200, { "Content-Type": "application/json" });

  // Send the JSON response with message, version, author, and description fields
  response.end(
    JSON.stringify({
      message: "Hello, World!", // Message to display
      version: "1.0.0", // Version of the API
      author: "Godfather", // Author of the API
      description: "Corepackage Using API", // Short description of the API
    })
  );

  // Log the date and time when the request was received
  console.log(`Request received at ${new Date()}`);

  // End the response (although `response.end()` has already been called above)
  response.end();
});

// Listen on the specified port and start the server
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`); // Log message to confirm the server is running
});
