const express = require("express");
const router = express.Router();

const {
    create,
    list,
    read,
    update,
    remove,
    listcount,
    listBy,
    searchFiilters,
    
  } = require("../Controllers/products");

const {auth,admin} = require('../Middleware/auth')

//@Endpoint http://localhost:5000/api/product

router.get('/product',list)

router.post('/product',auth,admin,create)

router.get('/products/:count',listcount)

router.delete('/product/:id',auth,admin,remove)


////
router.get('/product/:id',read)
router.post('/productby',listBy)

router.put('/product/:id',auth,admin,update)


router.post('/search/filters',searchFiilters)







module.exports = router;