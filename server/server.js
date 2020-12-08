import dotEnv from 'dotenv'
import express from 'express'
import cors from 'cors'

import connectDB from './config/db.js'
import companyRouter from './routes/company.js'
import userRouter from './routes/user.js'
const app = express();
dotEnv.config()

//connect with DB
connectDB()

//middlewares
app.use(cors())
app.use(express.json({ exptended: false }));

//routes 
app.get('/', (req, res) => {
    res.status(200).send(
        "API Home Page"
    )
});

//Routes
app.use('/api/v1', companyRouter);
app.use('/api/v1', userRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server started on port:',PORT);
})

