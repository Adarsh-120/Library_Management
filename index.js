const express = require("express");

const app = express();

const PORT = 8081;
app.use(express.json());

app.get("/", (req, res) => {
  res.status(202).json({
    message: "Server is up and running",
  });
});
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
