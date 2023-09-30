import path from 'path';
import fs from 'fs';
import SuperheroModel from './../models/Superhero.js';

export const deleteAllImageHandler = async (req, res, next) => {
  const uploadDir = path.join(process.cwd());
  const id = req.params.id;

  try {
    const superhero = await SuperheroModel.findById(id);
    console.log('filePath', superhero)
    if (superhero.Images && superhero.Images.length) {
      superhero.Images.forEach((filepath) => {
        const filePath = path.join(uploadDir, filepath);

        try {
          fs.unlinkSync(filePath);
        } catch (error) {
          return res.status(500).json({
            message: 'Error deleting file2222'
          });
        }
      });

      next();
    } else {
      res.status(404).json({
        message: 'Superhero not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting files'
    });
  }
};
