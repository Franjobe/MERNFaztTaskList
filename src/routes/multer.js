
const express = require("express");
const path = require("path");
const multer = require('multer');
const router = express.Router();

////////MULTER//////////////////////////////////////////////////

//set Multer Storage Engine
const storage = multer.diskStorage({
    destination: './src/public/uploads/',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//Init upload (almacena en el storage todo lo que se suba al input con fieldname "myImage")
const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).single('myImage');  //single porque es un archivo por vez, si fuera un array seria otro parametro.

//check file type
function checkFileType(file, cb) {
    //allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    //check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb (null, true);
    } else {
        cb ('Error: Images Only"')
    }
}; 

//UPLOAD IMAGE ROUTE
router.post('/upload', (req, res) => {
   console.log('Test!');
    upload(req, res, (err) => {
        if (err) {
            res.send(err)
        } else {
            if(req.file == undefined) {
                res.send("Error: no File Selected")
            } else {
                res.send({
                    msg: "File uploaded!",
                    file: `uploads/${req.file.filename}`
                });
            }
        }
    })
})

module.exports = router;