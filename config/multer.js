const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/game')
    },
    filename: function (req, file, cb) {
        let Filesuffix = file.originalname.split('.');
        Filesuffix = Filesuffix[Filesuffix.length - 1];
        cb(null, `${req.body.title}.${Filesuffix}`)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
})

module.exports = {
    upload
};