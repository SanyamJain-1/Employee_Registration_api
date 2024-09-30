const express = require('express')
const fs = require('fs')
const users = require('./MOCK_DATA.json');
const generateId = require('generate-unique-id')
const mongoose = require('mongoose');
const { type } = require('os');


//Connecting mongoose
mongoose.connect('mongodb://127.0.0.1:27017/employees')
.then(() => {
    console.log('MongoDB Connected')
})
.catch((err) => {
    console.log('Mongo Connection Error', err);
})

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
    },
    id: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    Title: {
        type: String,
    },
    ip_address: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
    },
},{ timestamps: true});

const user = mongoose.model('user',userSchema)

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/api/users', async (req, res)=> {
    const allDbUsers = await user.find({});
    return res.json(allDbUsers);
})
app.get('/api/user',(req, res) => {
    let user;
    if(req.query.id !== undefined){
        user = users.find((user) => {
            if(user.id == req.query.id)
            return user
    });
    }
    if(req.query.firstName !== undefined){
        user = users.find((user) => {
            if(user.first_name == req.query.firstName)
            return user;
    });
    }
    if(req.query.lastName !== undefined){
        user = users.find((user) => {
            if(user.last_name == req.query.lastName)
            return user;
    });
    }
    if(req.query.email !== undefined){
        user = users.find((user) => {
            if(user.email == req.query.email)
            return user;
    });
    }
    if(req.query.ip_address !== undefined){
        user = users.find((user) => {
            if(user.ip_address == req.query.ip_address)
            return user;
    });
    }
    
    if(!user){
        return res.end("No User Found")
    }
    return res.json(user);    
})
app.post('/api/user', async (req,res)=>{

    const newId = generateId({
        length : 10,
        useLetters : true,
        useNumbers : true
    })

    if(
        !req.body ||
        !req.body.firstName ||
        !req.body.lastName ||
        !req.body.Email ||
        !req.body.IP_Address ||
        !req.body.Title ||
        !req.body.Gender
    ){
        return res.status(400).json({
            msg: "All Fields are required"
        });
    }
    
    const data = await user.create({
        id : newId,
        first_name : req.body.firstName,
        last_name : req.body.lastName,
        email : req.body.Email,
        gender : req.body.Gender,
        ip_address : req.body.IP_Address,
        Title : req.body.Title
    })

    console.log('New user created sucessfully');

    return res.status(201).json(data);
})


app.patch('/api/user/:id', (req,res)=>{
    const id = req.params.id;
    const data = users.find((user)=>{
        if(user.id == id){
            if(req.body.firstName !== undefined){
                user.first_name = req.body.firstName; 
            }
            if(req.body.lastName !== undefined){
                user.last_name = req.body.lastName; 
            }
            if(req.body.Email !== undefined){
                user.email = req.body.Email; 
            }
            if(req.body.Gender !== undefined){
                user.gender = req.body.Gender; 
            }
            if(req.body.Title !== undefined){
                user.Title = req.body.Title; 
            }
        return user;
        }
    })

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (error) => {
        console.log(error);
    })

    res.status(200).json(data);
})

app.delete('/api/user/:id', (req, res)=>{
    const id = req.params.id;
    const index = users.findIndex((user)=> {
        if(user.id == id) {
            return user
        }
    })
    const data = users.splice(index, 1);
    return res.status(200).json(data);
})


const PORT = 5000;
app.listen(PORT, ()=> {
    console.log("Server Started! \nAt PORT: ",PORT)
})