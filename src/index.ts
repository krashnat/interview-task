import express from 'express';
import * as http from 'http';
import router from '../src/routes/endPoints';
import userRouter from '../src/routes/userEndpoints';

import bodyParser from 'body-parser'
import dotenv from 'dotenv';
dotenv.config();


const app = express()

app.use(bodyParser.json())
app.use('/api',router)
app.use('/api',userRouter)
const server = http.createServer(app)

server.listen(3000, () => {
    console.log("app started")
})