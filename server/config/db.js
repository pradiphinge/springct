import mongoose from 'mongoose'

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
            useCreateIndex:true
        })
        if (conn) {
            console.log('database connected');
        }
    } catch (err) {
        console.log('Error connecting database ---> ', err);
        process.exit();    
    }
}

export default connectDB