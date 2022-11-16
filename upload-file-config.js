import multer from 'multer';


const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        const error = null;
        cb(error, './tmp/uploads');
    },
    filename: function (req, file, cb) {
        const error = null;
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExt = file.mimetype.split('/')[1];
        const fileName = `${uniqueSuffix}-product.${fileExt}`;
        cb(error, fileName);
    }
});


const fileFilter = (req, file, cb) => {
    const error = null;
    const mimeTypeValidator = ['jpeg', 'jpg', 'png'];
    const fileExt = file.mimetype.split('/')[1];
    const validatedMimeType = mimeTypeValidator.includes(fileExt);
    if (!validatedMimeType) {
        cb(new Error('Formato del archivo incorrecto'), validatedMimeType);
        return;
    };
    cb(error, validatedMimeType);
};

const upload = multer({storage, fileFilter});


export default upload;

