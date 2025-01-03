import mongoose from "mongoose";

mongoose.connect("MongoDB URL");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String
})

export const User = mongoose.model("User", userSchema);

const ContentSchema = new mongoose.Schema({
    title : String,
    link : String,
    tags : [{type : mongoose.Schema.Types.ObjectId, ref : "Tag"}],
    userId : {type : mongoose.Schema.Types.ObjectId, ref : "User",required : true}
})  

export const Content = mongoose.model("Content", ContentSchema);