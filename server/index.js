import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'

const app =express();
dotenv.config();

// https://github.com/expressjs/body-parser#bodyparserjsonoptions

app.use(bodyParser.json({limit : "30mb", extended:true }))
app.use(bodyParser.urlencoded({limit : "30mb", extended:true }))
app.use(cors());

app.use('/posts', postRoutes)
app.use('/user',userRoutes)
//mongodb cloud atlas
// setting up the connection url of the backend

// setting up the port for the env
const PORT = process.env.PORT || 5000;

// writing a then block to make a successful connection request from the backend; accepts two different input, first the URL and then the block.

//if success, run it on the port; else , error
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser : true , useUnifiedTopology: true }).then(() => app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT : ${PORT}`))).catch((error) => console.log(error.message))
