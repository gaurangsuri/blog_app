const express = require("express");
const {isAuthenticated} = require("../helper/utils");
const { createComment, editComment, getUserComment, getIdComment, deleteComment } = require("./controllers");
const commentRouter = express.Router();

commentRouter.post("/comment",isAuthenticated,createComment);
commentRouter.put("/update",isAuthenticated,editComment);
commentRouter.get("/getbyuser",isAuthenticated,getUserComment);
commentRouter.get("/getbyid",isAuthenticated,getIdComment);
commentRouter.delete("/deletebyid",isAuthenticated,deleteComment);

module.exports = { commentRouter };