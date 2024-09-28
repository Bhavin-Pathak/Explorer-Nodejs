import express from "express";
import {
  getUsers,
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user_list.js";
//Route Object
const router = express.Router();

//! Default Route
//URL : ---->>>> //? /api/users
router.get("", (req, res) => {
  res.json({
    message: "Hello, World!",
    version: "1.0.0",
    author: "Godfather",
    description: "Users Management API's",
  });
});

//! GET All USERS LIST
//URL : ---->>>> //? /api/users/getusers
router.get("/getusers", getUsers);

//! GET USER BY ID
//URL : ---->>>> //? /api/users/get/1
router.get("/get/:id", getUserByID);

//!CREATE NEW USER
//URL : ---->>>> //? /api/users/create
router.post("/create", createUser);

//!UPDATE USER BY ID
//URL : ---->>>> //? /api/users/update/1
router.put("/update/:id", updateUser);

//!DELETE USER BY ID
//URL : ---->>>> //? /api/users/delete/1
router.delete("/delete/:id", deleteUser);

//Export the router
export default router;
