import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const app = express()
app.use(cors())

const PORT = process.env.PORT;

app.listen(PORT,()=>console.log(`server is running on ${PORT}`))