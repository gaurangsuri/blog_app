const {Comment} = require("./models");

const createComment = async(req,res) =>{
    var newComment = await Comment.create(req.body);
    var allComments = await Comment.find().populate("user_id");
    return res.json({status:"Comment created",newComment});
};

const getUserComment = async(req,res) =>{
    var display = await Comment.find({user_id:req.body.user_id});
    return res.json({status:"user comments :- ",display});
};

const getIdComment = async(req,res) =>{
    var display = await Comment.find({_id:req.body.id});
    return res.json({status:"Comment id found :- ",display});
};

const editComment = async(req,res) =>{
    var update = await Comment.findOne({_id:req.body.id});
    update.comment = req.body.newComment;
    await update.save();

    return res.json({status:"Comment edited :-",update});
};

const deleteComment = async(req,res)=>{
    var _id = req.body.id;
    var currComment = await Comment.findById(_id);
    await Comment.findByIdAndDelete(_id);
    return res.json({status:"Comment deleted",currComment});
};

module.exports={ createComment,getUserComment,getIdComment,editComment,deleteComment };