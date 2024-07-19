const mongoose = require("mongoose");


const connectDB =()=>{
  mongoose
  .connect(
    "mongodb+srv://js4368621:QlsmnziWRHks69ci@cluster0.ch28xho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connection successful");
  })
  .catch((e) => {
    console.log("no connection", e);
  });
}

module.exports={connectDB};

