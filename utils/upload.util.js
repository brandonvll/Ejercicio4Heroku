const multer = require('multer');
const path = require('path');

//almacena en disco y no en la nube, osea en el servidor
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'imgs'));
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}_${file.originalname}`;
    cb(null, filename);
  }
});

const upload = multer({ storage });

module.exports = { upload };
