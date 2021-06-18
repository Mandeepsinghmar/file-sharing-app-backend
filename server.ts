import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import filesRoute from './routes/file'
import {v2 as cloudinary} from 'cloudinary'

dotenv.config();
const app = express()
app.use(cors())

cloudinary.config({
cloud_name: process.env.CLOUDINARY_API_CLOUDNAME,
api_key: process.env.CLOUDINARY_API_KEY,
api_secret: process.env.CLOUDINARY_API_SECRET
})

const PORT = process.env.PORT;

// connected to mongo database
mongoose.connect(process.env.MONGO_URI!,{
        useCreateIndex:true,
        useNewUrlParser:true,
        useFindAndModify:true,
        useUnifiedTopology:true
    
    })


mongoose.connection.on('connected',()=>{
    console.log('connected to mongodb')
})

mongoose.connection.on('error',(error)=>{
    console.log('err while connected to mongo', error)
})

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

// routes
app.use('/api/files', filesRoute )


// listening the port 
app.listen(PORT,()=>console.log(`server is running on ${PORT}`))