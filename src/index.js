const express = require("express");
const studentRouter = require("./routes/student");
const registerRouter = require("./routes/UserRegister");
var cors = require("cors");
const { connectDB } = require("./db/conn");

const app = express();
const port = process.env.Port || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/v1", studentRouter);
app.use("/api/v1", registerRouter);

app.get("/",(req,res)=>{
  res.send("hello from server side")
})
const start = async () => {
connectDB()
}
start();
// app.listen(port, () => {
//   console.log(`connection is live to this port ${port}`);
// });
