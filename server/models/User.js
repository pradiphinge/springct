import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim:true,
        required:true
    },
    email: {
        type: String,
        trim: true,
        unique:true,
        required:true       
    },
    phone: {
        type: String,
        trim: true,  
    },
    companies: [
        {
            type: mongoose.ObjectId,
            ref:'Company'
        }
    ]
},{timestamps:true})

const User = mongoose.model('User', userSchema)
export default User 