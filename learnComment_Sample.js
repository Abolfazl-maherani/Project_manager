// --Start

//+ When Export Class ...
//# When export a class the best way is new that in the export declaration

//+ With clockify is for project manager for time
//^ https://app.clockify.me/

//+ For valid input in express
//# Install express-validator

//+ Code 11000 in mongoose
//# In mongoose 11000 is for unique a field

//+ Use every things in own place
//# For example check for to be unique must check in validation forder

//+ We cant throw error in async function
//# But the promise just return reject or respone and cant return an error
//# For solve that we must put that in try catch
//^ https://www.valentinog.com/blog/throw-async/

//+ Check and save in db
//# We must check every thing and Save that to db

//+ What is HAMC ?
//# Hashed Message Authentication Code Send hash message with a secret key
//# در رمز گذاری متقارن ما دوتا کلید برای رمزگذاری و بازگشایی داریم
//# در رمز گذاری نامتقارن

//+ md5 is 32 charecter
//# md5 can not roll back

//+ Hash
//# ورودی با طول نامعلوم خروجی با طول معلوم

//+ Use variable in http-rest-client
//# Can use {{}} to use variable in http-rest-client

//+ bail method  in express-validator
//# Stop error when get first error validation
body("password").notEmpty().withMessage("رمز عبور وارد نشده است").bail();

//+ Upload file in express
//# the best package: (multer, express-fileupload.js)
//+ When recursive:true option in fs.mkdirSync has set if exist directory we don`t get error

//? Wy save jwt token in db?
//--Pause 103 (11:11)

//+ DiskStorage in multer
//# you have full controll on storing
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/tmp/my-uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

//+ MemoryStorage in multer
//# Storage file in memory as buffer

//# Note: Multer will not append any file extension for you, your function should return a filename complete with an file extension.

//+ Add static folder to  gitignore
//# You must add static folder to gitignore

/****↓Helper↓****

Start, Pause, End: -- 
Tipa: #
Refrense: ^
Titles: @
StepLearn: +
BugContinue: ->
BugFixed: ->|

****↑Helper↑****/
