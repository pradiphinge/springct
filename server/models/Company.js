import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        unique:true,
        trim:true,
        required:true
    },
    city: {
        type: String,
        trim:true,
        required:true       
    }
},{timestamps:true})

const Company = mongoose.model('Company', companySchema)
export default Company 