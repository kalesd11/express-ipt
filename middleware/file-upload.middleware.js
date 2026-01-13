const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type"), false);
    }
};

// Used when uploading directly to cloud (AWS S3, Cloudinary, etc.)
// const upload = multer({ storage: multer.memoryStorage() });


const upload = multer({ storage, fileFilter, limits: { fileSize: 1024 * 1024 * 2 } });

module.exports = upload;
