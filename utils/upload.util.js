const multer = require('multer');
const path = require('path');

//almacena en disco, osea en el servidor
/* const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'imgs'));
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}_${file.originalname}`;
    cb(null, filename);
  }
});
 */

//almacena en memoria en la nube
const storage = multer.memoryStorage()

const upload = multer({ storage });

module.exports = { upload };
