import multer from '@koa/multer';
import path from 'path';

const limits = {
    fields: 10, //Number of non-file fields
    fileSize: 10024 * 1024, //File Size Unit b
    files: 1, //Number of documents
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public'));
    },
    filename: (req, file, cb) => {
        const type = file.originalname.split('.')[1];
        cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`);
    },
});

export const upload = multer({
    storage,
    limits,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
});
