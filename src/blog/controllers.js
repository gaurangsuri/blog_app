const { Blog } = require("./models");

const createNewBlog = async (req, res) => {
  var newBlog = (await Blog.create(req.body)).populate("user_id");
  var allBlogs = await Blog.find().populate("user_id");
  return res.json({ status: "Created", allBlogs });
};

const getBlogbyUser =async(req,res) =>{
  var show = await Blog.find({user_id:req.body.user_id});
  return res.json({status:"user blogs :- ",show})
};

const getBlogbyId = async (req, res) =>{
  var show = await Blog.find({_id:req.body.id});
  return res.json({status:"blogs by given ID :- ",show})
};

const editBlog = async (req,res)=>{
  var update = await Blog.findOne({title:req.body.title});
  update.description = req.body.newDescription;
  await update.save();

  return res.json({status:"blog updated",update})
};

const deleteBlog = async (req,res)=>{
  var _id = req.body.id;
  var currBlog = await Blog.findById(_id);
  await Blog.findByIdAndDelete(_id);
  return res.json({status:"blog deleted",currBlog})
};

module.exports = { createNewBlog,getBlogbyUser,getBlogbyId,editBlog,deleteBlog };