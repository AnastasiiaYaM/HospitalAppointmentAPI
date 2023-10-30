const express = require("express");

const usersRouter = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", usersRouter);

app.listen(3000, () => {
    console.log("Server is alive!");
  });