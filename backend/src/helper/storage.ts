import multer from 'multer';

const diskStorage = multer.diskStorage({
  destination: 'D:/publicCallsApp/backend/uploads',
  filename: (req, file, cb) => {
    const mimeType = file.mimetype.split('/');
    const fileType = mimeType[1];
    const fileName = file.originalname;
    //console.log(fileName);
    cb(null, fileName);
  },
});

const storage = multer({ storage: diskStorage});

export default storage;