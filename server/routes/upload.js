import express from "express";
import multer from "multer";
import {deleteImageHandler, uploadHandler} from "../controllers/UpploadController.js";

export const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
})


const upload = multer({storage})

uploadRouter.delete('/:filename', deleteImageHandler)
uploadRouter.post('/',upload.array('image'), uploadHandler)

