require("dotenv").config();

// database configuration
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to Database Successfully!"));

// url route configuration
const express = require("express");
const app = express();
app.use(express.json());

// routes
const cors = require("cors");
const userRouter = require("./routes/user");

app.use(cors());

app.use("/users", userRouter);

app.listen(4000, () => console.log("Server Started"));