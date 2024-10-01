import express from 'express';
import fs from 'fs';
import users from './MOCK_DATA.json';
import generateId from 'generate-unique-id';
import {type} from 'os';
import userRoutes from './routes/user';

//Connecting mongoose
mongoose.connect('mongodb://127.0.0.1:27017/employees')
.then(() => {
    console.log('MongoDB Connected')
})
.catch((err) => {
    console.log('Mongo Connection Error', err);
})


app.use('/', userRoutes);
const app = express();

app.use(express.urlencoded({ extended: true }));



const PORT = 5000;
app.listen(PORT, ()=> {
    console.log("Server Started! \nAt PORT: ",PORT)
})