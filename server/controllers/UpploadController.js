import path from 'path';
import fs from 'fs'

export const uploadHandler = (req, res) => {
  const urls = req.files.map(file => ({
    url: `/uploads/${file.originalname}`
  }));

  res.json(urls);
}


export const deleteImageHandler = (req, res) => {
  const uploadDir = path.join(process.cwd(), 'uploads');

  const { filename } = req.params;
  const filePath = path.join(uploadDir, filename);

  try {
    fs.unlinkSync(filePath);
    res.json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting file'
    });
  }
}



