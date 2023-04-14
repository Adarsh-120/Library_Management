const express = require("express");

const { users } = require("../data/users.json");

const router = express.Router();

/**
 * Route: /
 * Method: GET
 * Description: Get al users
 * Access: Public
 * Parameters: None
 */
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

/**
 * Route: /:id
 * Method: GET
 * Description: Get al users
 * Access: Public
 * Parameters: None
 */

// from const user to if box , will help to find that the user exists or not if not then further process i.e return here....!
router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(req.params);
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
 * Route: /
 * Method: POST
 * Description: Creating new users
 * Access: Public
 * Parameters: None
 */

router.post("/", (req, res) => {
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
 * Route: /
 * Method: PUT
 * Description: Updating a user by their id
 * Access: Public
 * Parameters: None
 */

router.put("/:id", (req, res) => {
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
 * Route: /
 * Method: DELETE
 * Description: Deleting a user by their id
 * Access: Public
 * Parameters: None
 */

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't exist",
    });
  }
  const index = users.indexOf(user);
  users.splice(index, 1);

  return res
    .status(200)
    .json({ success: true, message: "Deleted User..", data: users });
});

/**
 * Route: /users/subscription-details/:id
 * Method: GET
 * Description: Get all user subscription details
 * Access: Public
 * Parameters: ID
 */

router.get("/subscription-details/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User with the ID Didn't Exists",
    });
  }
  const getDateInDays = (data = "") => {
    let date;
    if (data === "") {
      date = new Date();
    } else {
      date = new Date(data);
    }
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };

  const subscriptionType = (date) => {
    if ((user.subscriptionType === "Basic")) {
      date = date + 90;
    } else if ((user.subscriptionType === "Standard")) {
      date = date + 180;
    } else if ((user.subscriptionType === "Premium")) {
      date = date + 365;
    }
    return date;
  };

  // Jan 1 1970 UTC

  let returnDateInDays = getDateInDays(user.returnDate);
  let currentDateInDays = getDateInDays();
  let subscriptionDateInDays = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDateInDays);

  // console.log("returnDate", returnDateInDays);
  // console.log("currentDate", currentDateInDays);
  // console.log("subscriptionDate", subscriptionDateInDays);
  // console.log("subscriptionExpiration", subscriptionExpiration);
 

const data = {
  ...user,
  isSubscriptionExpired: subscriptionExpiration < currentDateInDays,
  daysLeftForExpiration: subscriptionExpiration <= currentDateInDays ? 0: subscriptionExpiration - currentDateInDays,
  fine: returnDateInDays < currentDateInDays ? subscriptionExpiration < currentDateInDays ? 100:50:0,

};
return res.status(200).json({
  success: true,
  message: "Subscription detail for the user is: ",
  data,
});
});


module.exports = router;
