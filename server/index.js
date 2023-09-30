import express from 'express'
import mongoose from "mongoose";
import {router} from './routes/index.js'
import cors from "cors";

export const SERVER_PORT = 5000
export const BASE_URL = `http://localhost:${SERVER_PORT}`

mongoose.connect('mongodb+srv://admin:ad123456min@cluster0.baxnplz.mongodb.net/superheroes?retryWrites=true&w=majority')
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error',err))

const app = express()


app.use(express.json())
app.use(cors())
app.use('/uploads',express.static('uploads'))

app.use(router)


app.listen(SERVER_PORT, (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('Server OK')
})
