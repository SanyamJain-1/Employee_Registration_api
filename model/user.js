import mongoose from 'mongoose';


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


module.exports = {
    user
};
