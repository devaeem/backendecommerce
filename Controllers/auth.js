const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.login = async (req, res) => {
    try {
      const {username , password} = req.body;
      var user = await User.findOneAndUpdate({ username }, {new: true});
      if(user && user.enabled){
           const isMatch = await bcrypt.compare(password,user.password)
           if(!isMatch){
            return res.status(400).send("Password Invalid!!!");
           }
  
           const playload = {
            user:{
              username: user.username,
              role:user.role
            }
           };
           jwt.sign(playload,"jwtSecret",{expiresIn: '24h'},(err,token)=>{
            console.log(token)
            if(err) throw err;
            res.json({token,playload})
           })
  
  
      }else{
       return res.status(400).send("User Not found!!!");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Login Fail!!!");
    }
  };

  exports.currentuser = async (req, res) => {
    try {

     console.log("Controller",req.user)
    
    const usercurren = await User.findOne({username:req.user.username}).select('-password').exec();
  console.log("usercurren",usercurren)
    res.send(usercurren);
  
    } catch (err) {
      console.log(err)
      res.status(500).send("Server Fail!!!");
    }
  };
  