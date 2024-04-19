const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, 'uploads/'); // Specify the folder where files should be stored
    },
    filename: function (req, file, cb) {
       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Generate a unique filename
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
