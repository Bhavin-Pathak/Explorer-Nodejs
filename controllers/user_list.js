import db from "../config/db.js";

// Connect to the MySQL database
const promiseDB = db.promise();

//! GET ALL USERS LIST FROM DB
//? Function to get all users from the database
const getUsers = async (req, resp) => {
  try {
    const [rows] = await promiseDB.query("SELECT * FROM users");
    console.log(rows);

    if (rows.length === 0) {
      return resp
        .status(404)
        .send({ message: "No users found.", status: false });
    }
    resp.status(200).send({
      message: "Users fetched successfully",
      status: true,
      data: rows,
    });
  } catch (err) {
    console.error("Error getting users", err);
    resp.status(500).send({
      message: "Error getting users",
      status: false,
      error: err.message,
    });
  }
};
//! /users/:id GET USER BY ID FROM DATABSE
//? Function to get a user by their ID from the database
const getUserByID = async (req, resp) => {
  try {
    const userId = req.params.id;
    const [data] = await promiseDB.query("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);
    console.log(data);
    if (data.length === 0) {
      return resp
        .status(404)
        .send({ status: false, message: `User with ID ${userId} not found` });
    }
    resp.status(200).send({
      status: true,
      message: "User fetched successfully",
      data: data[0],
    });
  } catch (e) {
    console.error("Error getting user by id", e);
    resp.status(500).send({
      status: false,
      message: "Error getting user by id",
      error: e.message,
    });
  }
};

//! POST /users/ CREATE NEW USER TO DATABSE
const createUser = async (req, resp) => {
  try {
    const { name, address, phone } = req.body;
    const allowedFields = ["name", "address", "phone"];
    const extraFields = Object.keys(req.body).filter(
      (key) => !allowedFields.includes(key)
    );
    if (extraFields.length) {
      return resp
        .status(400)
        .send({ message: "Invalid parameters", extraFields });
    }
    const [result] = await promiseDB.query(
      "INSERT INTO users (name, address, phone) VALUES (?, ?, ?)",
      [name, address, phone]
    );
    if (!result.affectedRows) {
      return resp
        .status(400)
        .send({ message: "Failed to create user", status: false });
    }
    resp.status(201).send({
      message: "User created successfully",
      status: true,
      data: [{ id: result.insertId, name, address, phone }],
    });
  } catch (error) {
    console.error(error);
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
    const userId = req.params.id;
    const { name, address, phone } = req.body;
    const [result] = await promiseDB.query(
      "UPDATE users SET name=?, address=?, phone=? WHERE id=?",
      [name, address, phone, userId]
    );
    if (!result.affectedRows) {
      return resp
        .status(404)
        .send({ status: false, message: `User with ID ${userId} not found` });
    }
    resp.status(200).send({
      message: "User data updated successfully",
      status: true,
      data: [{ id: userId, name, address, phone }],
    });
  } catch (error) {
    console.error("Error updating user", error);
    resp.status(500).send({
      message: "Error updating user",
      status: false,
      error: error.message,
    });
  }
};

//! DELETE /users/:id DELETE USER BY ID FROM DATABSE
//? Delete userdata from DB
const deleteUser = async (req, resp) => {
  try {
    const userId = req.params.id;
    if (!userId || isNaN(userId)) {
      return resp.status(400).send({ message: "Invalid user ID provided" });
    }
    const [result] = await promiseDB.query("DELETE FROM users WHERE id=?", [
      userId,
    ]);
    if (!result.affectedRows) {
      return resp
        .status(404)
        .send({ status: false, message: `User with ID ${userId} not found` });
    }
    resp
      .status(200)
      .send({ status: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    resp.status(500).send({
      status: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
};

//!Export the router
export { getUsers, getUserByID, createUser, updateUser, deleteUser };
