const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const Products = require("../Models/Products");
const Carts = require("../Models/Carts");
const Orders = require("../Models/Orders");
exports.resgister = async (req, res) => {
  try {
    const { username, password } = req.body;
    var user = await User.findOne({ username });
    if (user) {
      return res.status(400).send("User Already exists");
    }
    const salt = await bcrypt.genSalt(10);
    console.log(user);
    user = new User({
      username,
      password,
    });
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.send("Resgister success");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error resgister!");
  }
};

exports.listuser = async (req, res) => {
  try {
    const user = await User.find({}).select("-password").exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error! listuser");
  }
};

exports.readuser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id }).select("-password").exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error! readuser");
  }
};

exports.edituser = async (req, res) => {
  try {
    var id = req.body.values.id;
    var password = req.body.values.password;
    console.log(id);
    console.log(password);
    const salt = await bcrypt.genSalt(10);
    var enPasword = await bcrypt.hash(password, salt);
    const user = await User.findOneAndUpdate(
      { _id: id },
      { password: enPasword }
    );

    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error! edituser");
  }
};

exports.removeuser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOneAndDelete({ _id: id });
    res.send("ลบข้อมูลเรียบร้อย");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error! removeuser");
  }
};

exports.changStatus = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { enabled: req.body.enabled }
    );
    // const user = await User.findOneAndDelete({_id:id});
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error! changStatus");
  }
};

exports.changRole = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { role: req.body.role }
    );
    // const user = await User.findOneAndDelete({_id:id});
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error! changRole");
  }
};

// exports.userCart = async (req, res) => {
//   try {
//     const { cart } = req.body;
//     let user = await User.findOne({ username: req.user.username }).exec();
//     let products = [];
//     let cartOld = await Carts.findOne({ orderBy: user._id });
//     if (cartOld) {
//      await cartOld.remove();
//     }
//     for (let i = 0; i < cart.length; i++) {
//       let Object = {};
//       Object.product = cart[i]._id;
//       Object.count = cart[i].count;
//       Object.price = cart[i].price;
//       products.push(Object);
//     }
//     let cartTotal = 0;
//     for (let i = 0; i < products.length; i++) {
//       cartTotal = cartTotal + products[i].price[i] * products[i].count;
//     }
//     let newCart = await new Carts({
//       products,
//       cartTotal,
//       orderBy: user._id,
//     }).save();
//     console.log(newCart);
//     res.send("userCart ok");
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Server Error");
//   }
// };
exports.userCart = async (req, res) => {
  try {
    const { cart } = req.body;

    // // Check User
    let user = await User.findOne({ username: req.user.username }).exec();
;
    // // สร้าง array [{1},{2},{3}]
    let products = [];
    // // Check ตะกร้าสินค้าอันเก่า
    let cartOld = await Carts.findOne({ orderBy: user._id }).exec();
    if (cartOld) {
      cartOld.deleteOne();
      console.log("remove old cart");
    }

    console.log(cartOld)
    // //แต่งสินค้า
    for (let i = 0; i < cart.length; i++) {
      let object = {};

      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.price = cart[i].price;

      // {3}
      products.push(object);
    }
    // // หาผลรวมของตะกร้า
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      //code
      cartTotal = cartTotal + products[i].price * products[i].count;
    }
console.log(products);


    let newCart = await new Carts({
      products,
      cartTotal,
      orderBy: user._id
    }).save();

     console.log(newCart);
     res.send("userCart Ok");
  } catch (err) {
    console.log(err);
    res.status(500).send("userCart Server Error");
  }
};
exports.getUserCarts = async (req, res) => {
  try {
    console.log(req.user.username);
    const user = await User.findOne({ username: req.user.username }).exec();
    // console.log(user._id);
    
    let cart = await Carts.findOne({ orderBy: user._id })
       .populate("products.product","_id title price")
      .exec();
      
      console.log(cart);
      const { products, cartTotal } = cart;
    res.json({ products, cartTotal });
  }catch(err) {
    res.status(500).send("getUserCart Error");
  }
};

exports.saveAddress = async (req, res) => {
  try {
    const useraddress = await User
    .findOneAndUpdate({username:req.user.username},
      {address:req.body.address}
      
      ).exec()

      res.json({ ok:true });
   
  }catch(err) {
    res.status(500).send("saveAddress Error");
  }
};


// Order
exports.saveOrder = async (req, res) => {
  try {
    //code
    let user = await User
    .findOne({username:req.user.username})
    .exec()

    let userCart = await Carts
    .findOne({orderBy:user._id})
    .exec()

    let order = await new Orders({
      products: userCart.products,
      orderBy: user._id,
      cartTotal: userCart.cartTotal
    }).save()

    // // + - products
    let bulkOption = userCart.products.map((item)=>{
      return {
        updateOne:{
          filter:{ _id:item.product._id},
          update:{ $inc:{quantity : -item.count,sold:+item.count}}
        }
      }
    })

     let updated = await Products.bulkWrite(bulkOption,{})

    res.send(updated);
  } catch (err) {
    res.status(500).send("Save Order Error");
  }
};


exports.emptyCart = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();

    const empty = await Carts
    .findOneAndRemove({orderBy:user._id})
    .exec()

    res.send(empty)

  } catch (err) {
    res.status(500).send("Remove Cart Error");
  }
};

exports.getOrder = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();

    let order = await Orders.find({ orderBy: user._id })
      .populate("products.product")
      .exec();
    res.json(order)
  } catch (err) {
    res.status(500).send("get Order Error");
  }
};



exports.addToWishList = async(req,res)=>{
  try{
    //code
    const { productId } = req.body
    let user = await User.findOneAndUpdate(
      {username:req.user.username},
      {$addToSet:{wishlist:productId}}
    ).exec()

    res.send(user)

  }catch(err){
    res.status(500).send('Add Wishlist Error')
  }
}


exports.getWishList = async(req,res)=>{
  try{
    //code
    let list = await User
    .findOne({username:req.user.username})
    .select('wishlist')
    .populate('wishlist')
    .exec()
    res.json(list)

  }catch(err){
    res.status(500).send('GET Wishlist Error')
  }
}
exports.removeWishList = async(req,res)=>{
  try{
    //code
    // //https://localhost/user/wishlist/465465456456456
    const { productId } = req.params
    let user = await User.findOneAndUpdate(
      {username:req.user.username},
      {$pull:{wishlist: productId}}
    ).exec()

    res.send(user)

  }catch(err){
    res.status(500).send('GET Wishlist Error')
  }
}
