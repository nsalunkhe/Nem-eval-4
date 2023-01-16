const mongoose=require("mongoose")

const UserSchema=mongoose.Schema({
    name:String,
    email:String,
    gender:String,
    pass:String
})


const Usermodel=mongoose.model("user",UserSchema)

module.exports={
    Usermodel
}