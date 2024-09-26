const express = require('express')
const fs = require('fs')
const users = require('./MOCK_DATA.json');
const generateId = require('generate-unique-id')

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/api/users', (req, res)=> {
    return res.json(users);
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
app.post('/api/user', (req,res)=>{

    const newId = generateId({
        length : 10,
        useLetters : true,
        useNumbers : true
    })
    
    users.push({
        id : newId,
        first_name : req.body.firstName,
        last_name : req.body.lastName,
        email : req.body.Email,
        gender : req.body.Gender,
        ip_address : req.body.IP_Address,
        Title : req.body.Title
    })

    let data = users.find((user) => {
        if(user.id === newId)
            return user; 
    })
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), "utf-8", (error) => {
        res.end("Error");
    })

    return res.status(200).json(data);
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
    console.log("Server Started!")
})