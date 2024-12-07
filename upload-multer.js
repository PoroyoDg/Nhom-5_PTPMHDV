const multer = require('multer');

var MyStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/image');
    },
    filename : (reg, file, cb) => {
        cb(null, file.originalname) ;
    },
});
const upload = multer({storage: MyStorage});

module.exports = upload; 
