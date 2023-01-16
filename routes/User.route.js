const express= require("express")
const userRouter=express.Router()
const {Usermodel}=require("../model/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()
//signup:
userRouter.post("/register",async(req,res)=>{
    const {email,pass,name,gender}=req.body
    try{
        bcrypt.hash(pass,5,async(err,hash)=>{
         if(err){
            console.log(err)
         }else{
            const user=new Usermodel({email,pass:hash,name,gender})
            await user.save()
            res.send("Registerd")
         }
        })
       
    }catch(err){
        res.send("Error in registering the user")
        console.log(err)
    }
   
})

//login:
userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try{
        const user= await Usermodel.find({email})
           
         
         if(user.length>0){
            bcrypt.compare(pass,user[0].pass,(err,result)=>{
                if(result){
                    const token = jwt.sign({userID:user[0]._id},process.env.key)
                    res.send({"msg":"Login Successfull","token":token})
                }else{
                    res.send("Wrong credentials")
                }
            })
            
         }else{
            res.send("Wrong credentials")
         }
         
    }catch(err){
        res.send("Something went wrong")
        console.log(err)
    }
    
})

module.exports={
    userRouter
}