let express = require('express');
let router = express.Router();
let upload = require('../config/multer.config.js');
 
const excelWorker = require('../controllers/excel.controller.js');



router.post('/api/file/upload', upload.single("file"), excelWorker.uploadFile);
module.exports = router;