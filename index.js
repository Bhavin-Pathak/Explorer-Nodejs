import express from "express"; // Import the Express.js framework
import db from "./config/db.js"; // Import the database configuration
import env from "dotenv"; // Import dotenv to load environment variables
import router from "./routes/user_routes.js"; // Import route handler for user-related routes

// Load environment variables from the .env file
env.config();

// Initialize Express app
const app = express();

// Define the port on which the server will run, default to 3000 if not specified in .env
const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Establish connection to the MySQL database
db.connect((err) => {
  if (err) throw err; // If there is an error during connection, throw the error
  console.log("MySQL Connected!"); // Log success message when the connection is established
  console.log("Connected to MySQL server"); // Additional log to confirm MySQL connection
});

// Set up the base API route, delegating to the imported router for further routing
app.use("/api/users", router);

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`); // Log message when the server is successfully running
});
