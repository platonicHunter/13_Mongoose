const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("6682689e194ddf75f692f377")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://admin:XX3liGKfTIt6mSiQ@db.ighaxue.mongodb.net/shop?retryWrites=true&w=majority&appName=DB"
  )
  .then((result) => {
    User.findOne().then(user =>{
     if(!user){
       const user=new User({
         name:'Htoo',
         email:'htoo@gmail.com',
         cart:{
           items:[]
         }
       })
       user.save();
     } 
    })
    app.listen(3000);
    console.log("Connected")
  })
  .catch((err) => console.log(err));
