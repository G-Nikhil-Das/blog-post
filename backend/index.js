import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser'
import mongoose from "mongoose";
import userRouter from './routes/user-routes'
// import blogRouter from './routes/blog-routes'
const app = express()
app.use(cors({credentials:true,origin:'http://localhost:3000'}))
app.use(express.json())
app.use(cookieParser())


app.use("/user", userRouter);
// app.use("/blog", blogRouter);

mongoose.connect('mongodb+srv://gnikhildas98:8uYTJgrUzjAIDyxa@cluster0.gidmgfr.mongodb.net/mern-blog?retryWrites=true&w=majority')

app.listen(5000)