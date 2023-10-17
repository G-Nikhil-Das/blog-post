import fs from 'fs';
import Blog from '../models/Blog'
import jwt from 'jsonwebtoken'
const secret = 'asqwerdfcvzx12qwaszxerdfcv';

export const getBlog = async (req,res) => {
    // const {id} = req.params;
    // const blogRecord = await Blog.findById(id).populate('author', ['email']);
    // res.json(blogRecord);
}

export const getAllPosts = async(req,res) => {
    let blogs;
    try {
        blogs = await Blog.find()
                        .populate('author', ['name'])
                        .sort({createdAt: -1})

    } catch (error) {
        console.log(error)
    }
    return res.status(200).json(blogs)

}
export const getMyPosts = async(req,res) => {
    let blogs;
    try {
        blogs = await Blog.find()
                        .populate('author', ['name', 'email'])
                        .sort({createdAt: -1})

    } catch (error) {
        console.log(error)
    }
    return res.status(200).json(blogs)
}

export const postBlog = async (req,res) => {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const newPath = path+'.'+parts[parts.length - 1];
    fs.renameSync(path, newPath);
    // res.json(res.json({files: req.file}));
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {
        if (err) throw err;
        const {title,description} = req.body;
        const postDoc = await Blog.create({
            title,
            description,
            cover:newPath,
            author:info.id,
        });
        res.json(postDoc);
    });
}