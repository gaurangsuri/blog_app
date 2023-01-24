const { Schema } = require("mongoose");

const commentSchema = new Schema({
    title:String,
    blog_id:{ type:Schema.Types.ObjectId, ref:"Blog" },
    user_id:{ type:Schema.Types.ObjectId, ref:"User" },
},{timestamps:true});

const Comment = mongoose.model("Comment",commentSchema);
module.exports={Comment};