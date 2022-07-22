const multer = require("multer");
const _PATH = require("path");
const _FS = require("fs");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const year = String(new Date().getFullYear());
    const month = String(new Date().getMonth());
    const day = String(new Date().getDate());
    const destination = _PATH.join(
      _PATH.resolve("public"),
      "upload",
      year,
      month,
      day
    );
    _FS.mkdirSync(destination, { recursive: true });
    cb(null, destination);
  },
  filename(req, file, cb) {
    const filename = Date.now().toString() + _PATH.extname(file.originalname);
    const ext = cb(null, filename.trim());
  },
});
const fileSize = Number(process.env["MAX_UPLOAD_SIZE"]);
const upload = new multer({
  storage,
  limits: {
    fileSize,
  },
  fileFilter(req, file, cb) {
    const mimType = ["image/jpeg", "image/png", "image/gif"];
    if (!mimType.includes(file.mimetype)) {
      const error = new Error("فرمت ارسال شده اشتباه میباشد");
      error.status = 403;
      return cb(error, false);
    }
    return cb(null, true);
  },
});
const translateMulter = (error) => {
  if (!(error instanceof multer.MulterError)) return;
  let { message } = error;
  switch (message) {
    case "File too large":
      error.message = " حداقل حجم آپلود 5 مگابایت میباشد";

      break;
  }
  return error;
};
module.exports = { upload, translateMulter };
