import express from 'express';
import multer from 'multer';
import path from 'path';
import cors from "cors";

const app = express();
app.use(cors({
    origin : "*"
}))
// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // folder where files will be stored
  },
  filename: (req, file, cb) => {
    // Use timestamp + original filename to avoid conflicts
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter for security (only images, for example)
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only image files are allowed!'), false);
//   }
// };

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({
    message: 'File uploaded successfully!',
    file: req.file,
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
