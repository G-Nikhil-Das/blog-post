import express from "express";
import { getBlog, postBlog, getAllPosts, getMyPosts } from './../controllers/blog-controller'
import multer from 'multer';
const uploadMiddleware = multer({ dest: 'uploads/' });

const blogRouter = express.Router();

// blogRouter.get("/:id", getBlog);
blogRouter.post("/post",uploadMiddleware.single('file'), postBlog);
blogRouter.get("/getPosts", getAllPosts);
blogRouter.get("/getMyPosts", getMyPosts);

export default blogRouter;
