import express from "express";
import {create, getAll, getOne, remove, update} from "../controllers/SuperheroController.js";
import {superheroValidator} from "../validations/superhero.js";
import handleValidationErrors from "../middlewares/handleValidationErrors.js";
import {deleteAllImageHandler} from "../middlewares/deleteAllImageHandler.js";

export const superheroRouter = express.Router()

superheroRouter.get('/', getAll)
superheroRouter.get('/:id', getOne)
superheroRouter.delete('/:id',deleteAllImageHandler, remove)
superheroRouter.patch('/:id', superheroValidator, handleValidationErrors, update)
superheroRouter.post('/', superheroValidator, handleValidationErrors, create)
