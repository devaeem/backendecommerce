const express = require("express");
const router = express.Router();

// controllers
const {
  resgister,
  listuser,
  readuser,
  edituser,
  removeuser,
  getuser,
  
} = require("../Controllers/users");
const {
  login,currentuser
} = require("../Controllers/auth");

const { auth ,admin } = require('../Middleware/auth')


router.post("/login", login);


// router.get("/getuser", getuser);

router.post("/current-user",auth, currentuser);
router.post("/current-admin",auth,admin, currentuser);

router.get("/test",auth,admin,(req,res)=>{
  res.send('hello test')
});


module.exports = router;
