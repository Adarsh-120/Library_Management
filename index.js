const express = require("express");
const { users } = require("./data/users.json");

const app = express();

const PORT = 8081;
app.use(express.json());

app.get("/", (req, res) => {
  res.status(202).json({
    //In place of json we can use send but json help to update more than one
    // time data's or message .It can automatically update the new added lines.
    message: "Server is up and running",
  });
});

/**
 * Route: /users
 * Method: GET
 * Description: Get al users
 * Access: Public
 * Parameters: None
 */

app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route does not exist",
  });
});
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
