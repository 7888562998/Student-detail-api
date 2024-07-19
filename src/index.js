const express = require("express");
const studentRouter = require("./routers/student");
const registerRouter = require("./routers/UserRegister");
var cors = require("cors");
require("./db/conn");

const app = express();
const port = process.env.Port || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/v1", studentRouter);
app.use("/api/v1", registerRouter);

app.listen(port, () => {
  console.log(`connection is live to this port ${port}`);
});
