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


const start = async () => {
connectDB()
app.get("/",(req,res)=>{
  res.send("hello from server side")
})
}
start();
app.listen(port, () => {
  console.log(`connection is live to this port ${port}`);
});
