const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/user.route");
const noteRoutes = require("./routes/note.route");
const { pagenotFound, errorHandler } = require("./middleware/errorHandler");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/note", noteRoutes);

app.use(pagenotFound);
app.use(errorHandler);

module.exports = app;
