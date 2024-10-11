// const multer = require('multer');
// const { uuid } = require('uuidv4'); 

// const serverPath = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, 'public/images');
//     },
//     filename: (req, file, callback) => {
//         const ext = file.originalname.substring(file.originalname.lastIndexOf("."));
//         callback(null, uuid() + ext);
//     }
// });

// const upload = multer({ storage: serverPath });

module.exports = upload;

var multer=require('multer')
const { v4: uuidv4 } = require('uuid')
//const { uuid } = require('uuidv4');
var storage=multer.diskStorage({
destination:(req,file,path)=>
{path(null,'public/images')}
,
filename:(req,file,path)=>{
  var ext=file.originalname.substring(file.originalname.lastIndexOf("."))
 path(null, uuidv4()+ext)}
 });
var upload=multer({storage:storage})
module.exports=upload;
