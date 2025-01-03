import express from "express";
import  jwt  from "jsonwebtoken";
import { Content, User } from "./db";
import { JWT_SECRET } from "./config";
import { userAuthMiddleware } from "./middleware";

const app = express()
app.use(express.json())

app.post("/api/v1/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try{
        const user = await new User({
            username,
            password
        })
    
        res.json({
            msg : `User created successfully, Hello ${username}`
        })
    }catch(err){
        res.json({
            msg : "User already exists"
        })
    }

})

app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await User.findOne({username, password});
    if(existingUser){
        const token = jwt.sign({id:existingUser._id},JWT_SECRET)
        res.json({
            token
        })
    }else{
        res.status(403).json({
            msg : "Invalid credentials"
        })
    }
})

app.post("/api/v1/content",userAuthMiddleware, async (req, res) => {
    const title = req.body.title;
    const link = req.body.link;
    await new Content({
        title,
        link,
        // @ts-ignore
        userId : req.userId,
        tags :[]
    }).save();
    res.json({
        msg : "Content created successfully"
    })
})

app.get("/api/v1/content",userAuthMiddleware, async (req, res) => {
    // @ts-ignore
    const userId = req.userId;
    const content = await Content.find({userId}).populate("userId","username");
    res.json({
        content
    })
})

app.delete("/api/v1/content", async (req, res) => {
    // @ts-ignore
    const userId = req.userId;
    const deletedContent = await Content.findByIdAndDelete(userId);
    res.json({
        msg : "Content deleted successfully"
    })
})

app.put("/api/v1/content", async (req, res) => {
    // @ts-ignore
    const userId = req.userId;
    const link = req.body.link;
    const title = req.body.title;
    const updatedContent = await Content.findByIdAndUpdate(userId,{link,title});
    res.json({
        msg : "Content updated successfully"
    })
})
app.post("/api/v1/brain/share", async (req, res) => {

})

app.post("/api/v1/brain/:shareLink", async (req, res) => {

})