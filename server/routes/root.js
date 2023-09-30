import express from "express";
import {rootHandler} from "../controllers/root.js";

export const rootRouter = express.Router()

rootRouter.get('/', rootHandler)
