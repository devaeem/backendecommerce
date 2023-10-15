const express = require("express");
const router = express.Router();

 const {
  createImage,
  removeImage,
    
  } = require("../Controllers/cloudinary");

const {auth,admin} = require('../Middleware/auth')

//@Endpoint http://localhost:5000/api/images

router.post('/images',auth,admin,createImage)

router.post('/removeimages',auth,admin,removeImage)



module.exports = router;