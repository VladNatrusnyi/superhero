import express from "express";
import {rootRouter} from './root.js'
import {superheroRouter} from "./superhero.js";
import {uploadRouter} from "./upload.js";

export const router = express.Router()

router.use('/uploads', uploadRouter)
router.use('/superheroes', superheroRouter)
router.use('/', rootRouter)
