const multer = require('multer')

//using memory storage to store images on database
const storage = multer.memoryStorage();
const upload = multer({storage:storage});

module.exports = upload;