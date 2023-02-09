const express = require("express");
const { isAuthenticated } = require("../helper/utils");
const { createNewBlog, editBlog, getBlogbyUser, getBlogbyId, deleteBlog } = require("./controllers");
const blogRouter = express.Router();

blogRouter.post("/blog",isAuthenticated,createNewBlog);
blogRouter.put("/update",isAuthenticated,editBlog);
blogRouter.get("/getbyuser",isAuthenticated,getBlogbyUser);
blogRouter.get("/getbyid",isAuthenticated,getBlogbyId);
blogRouter.delete("/deletebyid",isAuthenticated,deleteBlog);

module.exports = {blogRouter};