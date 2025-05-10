const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const cokieParser = require("cookie-parser");
const connetToDb = require("./db/db");
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const mapRoutes = require("./routes/map.routes");

connetToDb();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cokieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRoutes);

app.use("/captains", captainRoutes);

app.use("/maps", mapRoutes);

module.exports = app;
