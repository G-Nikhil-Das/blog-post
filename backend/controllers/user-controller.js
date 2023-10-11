import User from '../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const salt = bcrypt.genSaltSync(10);
const secret = bcrypt.genSaltSync(10);

export const register = async (req,res)=> {
    const {name, email, password} = req.body;
    try {
        const user = await User.findOneAndUpdate({email: email}, { $set: { password: bcrypt.hashSync(password, salt), name }})
        if(!user) {
            const newUser = await User.create({name, email, password: bcrypt.hashSync(password, salt)});
            res.json(newUser)
        } else {
            const user = await User.findOne({email: email})
            res.json(user)
        }
    } catch(err) {
        res.status(400).json(err)
    }
}

export const login = async (req,res)=> {
    const { email, password} = req.body;
    try {
        const user = await User.findOne({email: email})
        if(!user) {
            res.status(400).json('No user found')
        } else {
            const isValidUser = bcrypt.compareSync(password, user.password)
            if(isValidUser) {
                // res.json('OK')
                jwt.sign({email,id:user._id}, secret, {}, (err,token) => {
                    if (err) throw err;
                    res.cookie('token', token).json({
                      id:user._id,
                      email,
                    });
                });
            } else {
                res.status(400).json('Wrong Credentials')
            }
            // res.json(user)
        }
    } catch(err) {
        res.status(400).json(err)
    }
}