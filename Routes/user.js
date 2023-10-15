const express = require("express");
const router = express.Router();

const {
  resgister,
  listuser,
  readuser,
  edituser,
  removeuser,
  changStatus,
  changRole,
  userCart,
  getUserCarts,
  saveAddress,
  saveOrder,
  emptyCart,
  addToWishList,
  getWishList,
  removeWishList,
  getOrder
} = require("../Controllers/users");


const { auth ,admin } = require("../Middleware/auth")


//listuser
router.get("/user",auth ,admin, listuser);
//listcreateuser
router.post("/user", resgister);
// // readuser
 router.get("/user/:id",readuser);
// edituser
router.put("/user/:id", edituser,auth);
// removeuser
router.delete("/user/:id",auth ,admin, removeuser);


router.post("/chang-status", auth ,admin,changStatus);
router.post("/chang-role", auth ,admin,changRole);

router.post("/user/cart", auth,userCart);
router.get("/users/cart",auth,getUserCarts);
router.delete("/users/cart", auth, emptyCart);
router.post("/users/address",auth,saveAddress);

  //order
router.post("/user/order", auth, saveOrder);
 router.get("/users/orders", auth, getOrder);

// wishlist
router.post("/users/wishlist", auth, addToWishList);
router.get("/users/wishlist", auth, getWishList);
router.put("/users/wishlist/:productId", auth, removeWishList);

module.exports = router;