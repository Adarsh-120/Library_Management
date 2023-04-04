const express = require("express");

const userRouter = require("./routes/users.js");
const booksRouter = require("./routes/books.js");

const app = express();

const PORT = 8081;

app.use(express.json());

//localhost:8081/users
http: app.get("/", (req, res) => {
  res.status(202).json({
    //In place of json we can use send but json help to update more than one
    // time data's or message .It can automatically update the new added lines.
    message: "Server is up and running",
    data: "hey",
  });
});

app.use("/users", userRouter);
app.use("/books", booksRouter);

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route does not exist",
  });
});
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
