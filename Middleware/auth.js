const jwt = require("jsonwebtoken");
const { mongoose } = require("mongoose");
const User = require("../Models/User");
exports.auth = (req, res, next)=>{

    try{
     const token = req.headers["authtoken"]
     if(!token){
        return res
        .status(401)
        .send('no Token , authorization denied');
     }
     const decoded = jwt.verify(token,'jwtSecret')
     req.user = decoded.user

     console.log('mid',decoded)
     next()

    }catch(err){
        console.log(err)
        return res
        .status(401)
        .send('Token Invavid!!!');
    }
}

exports.admin = async(req, res, next)=>{

    try{
     const {username} = req.user
     const admin = await User.findOne({ username }).exec()
     console.log(admin)
     if(admin.role !== 'admin'){
        res
        .status(403)
        .send(err,'admin Access denied');
     }else{
        next()
     }

    }catch(err){
        console.log(err)
        return res
        .status(401)
        .send('admin Access denied');
    }
}