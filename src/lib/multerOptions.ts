import multer from '@koa/multer'
import path from 'path'

const limits = {
    fields: 10,//Number of non-file fields
    fileSize: 500 * 1024,//File Size Unit b
    files: 1//Number of documents
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname ,'../public'))
    },
    filename: function (req, file, cb) {
        let type = file.originalname.split('.')[1]
        cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`)
    }
})

export const upload = multer({ storage, limits });