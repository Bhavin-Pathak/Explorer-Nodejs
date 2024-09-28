import db from "../config/db.js";

const promiseDB = db.promise();

//! GET ALL USERS LIST FROM DB
//? Function to get all users from the database
const getUsers = async (req, resp) => {
  try {
    // Execute the query to fetch all users from the 'users' table
    const [rows] = await promiseDB.query("SELECT * FROM users");
    // Log the result of the query to the console for debugging purposes
    console.log(rows);
    // Check if no users were found in the database
    if (rows.length === 0) {
      // If no users found, return a 404 status with an appropriate message
      return resp.status(404).send({
        message: "No users found in the database.",
        status: false,
      });
    }
    // If users are found, send the response with a 200 status, user count, and the user data
    resp.status(200).send({
      message: "Users fetched successfully",
      status: true,
      data: [rows],
    });
  } catch (err) {
    // If there is an error during the query execution, log the error and send a 500 status
    console.error("Error getting users", err);
    resp.status(500).send({
      message: "Error getting users",
      status: false,
      error: err.message, // Send the error message in the response
    });
  }
};
//! /users/:id GET USER BY ID FROM DATABSE
//? Function to get a user by their ID from the database
const getUserByID = async (req, resp) => {
  try {
    console.log(req.params);
    // Get the user ID from the request parameters
    const userId = req.params.id; // Check that :id is defined correctly in your routes
    // Execute the query to fetch the user with the given ID from the 'users' table
    const [data] = await promiseDB.query("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);
    console.log(data); // Log the result for debugging
    // Check if no user was found for the given ID
    if (data.length === 0) {
      return resp.status(404).send({
        status: false,
        message: `User with ID ${userId} not found`,
      });
    }
    // If a user is found, send the response with a 200 status, user data
    resp.status(200).send({
      status: true,
      message: "User fetched successfully",
      data: data[0], // Send the found user object
    });
  } catch (e) {
    console.error("Error getting user by id", e);
    resp.status(500).send({
      status: false,
      message: "Error getting user by id",
      error: e.message, // Send the error message in the response
    });
  }
};
//! POST /users/ CREATE NEW USER TO DATABSE
const createUser = async (req, resp) => {
  try {
    console.log(req.params);
    const { name, address, phone } = req.body; // No need to include id
    // Check for extra parameters (only allow name, address, phone)
    const allowedFields = ["name", "address", "phone"];
    const extraFields = Object.keys(req.body).filter(
      (key) => !allowedFields.includes(key)
    );
    if (extraFields.length > 0) {
      return resp.status(400).send({
        message: "Invalid parameters",
        extraFields,
      });
    }
    //? Insert the new user into the database (id is auto-generated)
    const [result] = await promiseDB.query(
      "INSERT INTO users (name, address, phone) VALUES (?,?,?)",
      [name, address, phone]
    );
    //? Check if the insertion was successful
    if (result.affectedRows === 0) {
      return resp.status(400).send({
        status: false,
        message: "Failed to create user",
      });
    }
    4; //? Send the response with a 201 status and the new user data
    resp.status(201).send({
      message: "User created successfully",
      status: true,
      data: [
        {
          id: result.insertId, //? Get the auto-generated id from the result
          name,
          address,
          phone,
        },
      ],
    });
  } catch (error) {
    console.log(error);
    resp.status(500).send({
      message: "Error creating user",
      status: false,
      error: error.message,
    });
  }
};
//! PUT /users/:id UPDATE USER BY ID IN DATABSE
//? UPDATE USER DATA
const updateUser = async (req, resp) => {
  try {
    console.log(req.params);
    console.log(req.body);
    const userId = req.params.id; // Get the user ID from the request parameters
    const { name, address, phone } = req.body; // Get the updated user data from the request body
    // Execute the query to update the user with the given ID in the 'users' table
    const [result] = await promiseDB.query(
      "UPDATE users SET name=?, address=?, phone=? WHERE id=?",
      [name, address, phone, userId]
    );
    console.log(result); // Log the result for debugging
    // Check if the update was successful
    if (result.affectedRows === 0) {
      return resp.status(404).send({
        status: false,
        message: `User with ID ${userId} not found`,
      });
    }
    // If the update is successful, send the response with a 200 status, user data
    resp.status(200).send({
      message: "User data updated successfully",
      status: true,
      data: [
        {
          id: userId, // Send the updated user ID in the response
          name,
          address,
          phone,
        },
      ],
    });
  } catch (error) {
    console.error("Error updating user", error);
    resp.status(500).send({
      message: "Error updating user",
      status: false,
      error: error.message, // Send the error message in the response
    });
  }
};
//! DELETE /users/:id DELETE USER BY ID FROM DATABSE
//? Delete userdata from DB
const deleteUser = async (req, resp) => {
  try {
    const userId = req.params.id; // Get the user ID from the request parameters
    // Validate that userId is a number and not null/undefined
    if (!userId || isNaN(userId)) {
      return resp.status(400).send({
        message: "Invalid user ID provided",
      });
    }
    // Execute the query to delete the user with the given ID from the 'users' table
    const [result] = await promiseDB.query("DELETE FROM users WHERE id=?", [
      userId,
    ]);
    // Check if the deletion was successful
    if (result.affectedRows === 0) {
      return resp.status(404).send({
        status: false,
        message: `User with ID ${userId} not found`,
      });
    }
    // If the deletion is successful, send the response with a 200 status
    return resp.status(200).send({
      status: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return resp.status(500).send({
      status: false,
      message: "Failed to delete user",
      error: error.message, // Send the error message in the response
    });
  }
};

//!Export the router
export { getUsers, getUserByID, createUser, updateUser, deleteUser };
