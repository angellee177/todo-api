const express = require('express');
const app = express();
require('dotenv/config');
const port = process.env.PORT;
const mongoose = require('mongoose');
const dbConnection ={
    development: "mongodb://localhost/todo", 
    test: "mongodb://localhost/test",
    production: "mongodb+srv://angellee177:5LWN2FrrmyVEa7F@cluster0-bgfog.mongodb.net/test?retryWrites=true&w=majority"
  } 
// Please change this value into your database connection URI
const env = process.env.NODE_ENV;


app.use(express.json());
app.use(
express.urlencoded({
extended: true
})
);


// Using Route-Level Middleware
const router = require("./routes");
app.use("/api", router);

app.get("/", (req, res) => {
res.status(200).json({
success: true,
message: "Welcome to API!"
});
});

// to connect with the DB
try{
  mongoose.connect(dbConnection[env], 
  { useNewUrlParser: true, useCreateIndex: true})

  app.listen(port, () => {
      console.log(`Server Started at ${Date()}!`);
      console.log(`Listening on port ${port}!`);
      });

  console.log("success connect to database")
}
catch(error){
  console.log(error)
};
module.exports = app;