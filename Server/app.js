const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/authRoutes")

const PORT = process.env.PORT || 8080;

const mongoUrl =
  "mongodb+srv://shashankraj:shashankraj@motorq.q35wks5.mongodb.net/?retryWrites=true&w=majority";
app.options("*", cors());
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(authRoutes);



app.use((error, req, res, next) => {
  console.log(error);
  const data = error.data;
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message, data: data });
});

mongoose.connect(mongoUrl + "?retryWrites=true&w=majority").then(() => {
  app.listen(PORT);
  console.log("Connected to Server!");
});
