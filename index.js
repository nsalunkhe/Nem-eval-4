const express=require("express")
const {connection}=require("./config/db")
const {userRouter}=require("./routes/User.route")
const {postRouter}=require("./routes/Post.route")
const {authenticate}=require("./middleware/authenticate.middleware")

const cors=require("cors")
require("dotenv").config()
const app=express()
app.use(cors({
    origin:"*"
}))

app.use(express.json())

app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts",postRouter)

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected to db")
    }catch(err){
        console.log("Trouble in connecting to db")
        console.log(err)
    }
    console.log(`running at ${process.env.port}`)
})