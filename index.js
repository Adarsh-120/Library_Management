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

/**
 * Route: /users/:id
 * Method: GET
 * Description: Get al users
 * Access: Public
 * Parameters: None
 */

// from const user to if box , will help to find that the user exists or not if not then further process i.e return here....!
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exist",
    });
  }
  return res.status(200).json({
    success: true,
    message: "User Found",
    data: user,
  });
});

/**
 * Route: /users
 * Method: POST
 * Description: Creating new users
 * Access: Public
 * Parameters: None
 */

app.post("/users", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;

  const user = users.find((each) => each.id === id);

  if (user) {
    return res.status(404).json({
      success: false,
      message: "User with the ID exists",
    });
  }

  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });
  return res.status(201).json({
    success: true,
    message: "User Added Successfully",
    data: users,
  });
});

/**
 * Route: /users
 * Method: PUT
 * Description: Updating a user by their id
 * Access: Public
 * Parameters: None
 */

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exist",
    });
  }
  const updateUserData = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    message: "User updated !!",
    data: updateUserData,
  });
});

/**
 * Route: /users
 * Method: DELETE
 * Description: Deleting a user by their id
 * Access: Public
 * Parameters: None
 */

app.get("/users/:id", (req, res) => {
  const { id } = req.params;

  const user = users.find((each) => each.id === id);
  if(!user){
    return res.status(404).json({
      success: false,
      message: "User Doesn't exist",
    });
  }

})

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route does not exist",
  });
});
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
