const Products = require("../Models/Products");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    //   const {name} = req.body
    const products = await new Products(req.body).save();
    //   console.log(re);
    res.send(products);
  } catch (err) {
    res.status(500).send("Create Products Server Error!!!");
  }
};

exports.list = async (req, res) => {
  try {
    const products = await Products.find().populate("category");
    //   console.log(re);
    res.send(products);
  } catch (err) {
    res.status(500).send("Create Products Server Error!!!");
  }
};

exports.listcount = async (req, res) => {
  try {
    const count = parseInt(req.params.count);
    const products = await Products.find()
      .limit(count)
      .populate("category")
      .sort([["createdAt", "desc"]]);
    //   console.log(re);
    res.send(products);
  } catch (err) {
    res.status(500).send(" Server Error!!!");
  }
};

exports.remove = async (req, res) => {
  try {
    const products = await Products.findByIdAndRemove({
      _id: req.params.id,
    }).exec();

    res.send(products);
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};

exports.read = async (req, res) => {
  try {
    const products = await Products.findOne({ _id: req.params.id })
      .populate("category")
      .exec();
    res.send(products);
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};
exports.update = async (req, res) => {
  try {
    const products = await Products.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.send(products);
  } catch (err) {
    res.status(500).send("Server Error!!!");
  }
};

exports.listBy = async (req, res) => {
  try {
    const { sort, order, limit } = req.body;

    const products = await Products.find()
      .limit(limit)
      .populate("category")
      .sort([[sort,order]]);
    res.send(products);
  } catch (err) {
    res.status(500).send("List By Products Server Error!!!");
  }
};

const handleQueery = async (req,res,query)=>{
  console.log("testfuntions",query);
    let products = await Products.find({ $text: { $search: query } } )
    .populate("category")

   console.log(products);
   res.send(products)
}


const handlePrice = async (req,res,price)=>{
  console.log("testfuntions",price);
    let products = await Products.find({
      price:{
        $gte:price[0],
        $lte:price[1]
      }
    })
    .populate("category")

   console.log(products);
   res.send(products)
}

const handleCategory = async (req,res,category)=>{
  console.log("testfuntions",category);
    let products = await Products.find({category})
    .populate("category")

   console.log(products);
   res.send(products)
}

exports.searchFiilters = async (req, res) => {
  try {
    const { query ,price,category} = req.body;
    
    if(query){
      console.log("query",query);
      await handleQueery(req,res,query)
    }

    if(price !== undefined){
      console.log("price----->",price);
      await handlePrice(req,res,price)
    }
    if(category !== undefined){
      console.log("category----->",category);
      await handleCategory(req,res,category)
    }



  } catch (err) {
    console.log(err);
     res.status(500).send(" Server Error!!!");
  }
};