// const multer = require('multer');
// const path = require('path');



// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'Public/uploads');
//     },
//     filename: function (req, file, cb) {
//         const uniqueName = Date.now() + path.extname(file.originalname);
//         cb(null, uniqueName);
//     }
// });

// const upload = multer({
//     storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype.startsWith('image/')) {
//             cb(null, true);
//         } else {
//             cb(new Error('Only images allowed'), false);
//         }
//     }
// });

// module.exports = upload;



const fs = require('fs');
const multer = require('multer');
const path = require('path');

const uploadPath = path.join(__dirname, '../Public/uploads');

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

module.exports = upload;
