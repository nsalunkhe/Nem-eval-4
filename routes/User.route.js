const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

userRouter.post("/register", async (req, res) => {
  const { email,pass,name,gender } = req.body;
  try {
    bcrypt.hash(pass, 5, async(err,sec) => {
      if (err) {
        console.log(err);
      }else{
        const user = new UserModel({email,pass:sec,name,gender});
        await user.save();
        res.send("registered");
      }
    })
  } catch (err) {
    res.send("error during signup")
    console.log(err);
  }
});

userRouter.post("/login",async (req, res) => {
  const {email,pass}=req.body;
  try {
    const user =await UserModel.find({email})
    const hash=user[0].pass
    if(user.length > 0) {
      bcrypt.compare(pass,hash, (err, result) => {
        if(result){
          const token = jwt.sign({userID:user[0]._id}, 'masai');
          res.send({"msg":"Logged In","token":token});
        }else{
          res.send("wrong credentials")
        }
      });
    }else{
      res.send("wrong credentials")
    }
  } catch (err) {
    res.send("Something Wrong while logging in")
    console.log(err)
  }
});
module.exports = {
  userRouter
}