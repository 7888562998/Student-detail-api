const express = require("express");
const studentRouter = require("./src/routes/student");
const registerRouter = require("./src/routes/UserRegister");
var cors = require("cors");
const { connectDB } = require("./src/db/conn");

const app = express();
const port = process.env.Port || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/v1", studentRouter);
app.use("/api/v1", registerRouter);

// const start = async () => {
//   await connectDB();
//   app.get("/", (req, res) => {
//     res.send("hello from server side");
//   });
// };

const start = async () => {
  try {
    await connectDB();
    console.log("Database connected successfully");

    app.get("/", (req, res) => {
      res.send("hello from server side");
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};
start();
// app.listen(port, () => {
//   console.log(`connection is live to this port ${port}`);
// });

module.exports = app;