import mysql from "mysql2";

const connection = mysql.createConnection({
  //? Replace these values with your MySQL server credentials
  host: "localhost", //! Host
  user: "root", //! Username
  password: "", //! DB Password
  database: "node_cruds", //! DB Name
});

export default connection;
