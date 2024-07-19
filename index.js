const express = require("express");
const studentRouter = require("./routes/student");
const registerRouter = require("./routes/UserRegister");
var cors = require("cors");
const { connectDB } = require("./src/db/conn");
const StudentDetail = require("./src/models/student");

const app = express();
const port = process.env.Port || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/v1", studentRouter);
app.use("/api/v1", registerRouter);

const start = () => {
  connectDB()
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
  app.get("/", async(req, res) => {
    res.status(200).json("Api ready to use");
  });
};
start();
app.listen(port, () => {
  console.log(`connection is live to this port ${port}`);
});

module.exports = app;
