const multer = require("multer");

const uploadAvatar = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req,file,cb) => {
        cb(null, `${new Date().getTime()}`+"."+ file.mimetype.split("/")[1]);
    },
    fileFilter: (req,file,cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null,false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    }
  }),
});
module.exports = {uploadAvatar};