const express = require('express')
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const app = express()
app.use(cors())
app.use(express.json());

const User = require('./models/User')

mongoose.connect('mongodb+srv://gnikhildas98:8uYTJgrUzjAIDyxa@cluster0.gidmgfr.mongodb.net/mern-blog?retryWrites=true&w=majority')

app.post('/register', async (req,res)=> {
    const {email, password} = req.body;
    const user = await User.findOneAndUpdate({email: email}, { $set: { password: password }})
    if(!user) {
        const newUser = await User.create({email, password});
        res.json(newUser)
    } else {
        const user = await User.findOne({email: email})
        res.json(user)
    }
})

app.listen(5000)