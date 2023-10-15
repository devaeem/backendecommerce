const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
  secure: true,
});

exports.createImage = async (req, res) => {
  try {
    console.log(req.body.image);
    const result = await cloudinary.v2.uploader.upload(req.body.image, {
      public_id: Date.now(),
      resource_type: "auto",
    });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server erroe ddfdf!!!");
  }
};

exports.removeImage = async (req, res) => {
  try {
    let image_id = req.body.public_id
    await cloudinary.v2.uploader.destroy(image_id,(result)=>{
        res.send(result)
    })



  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!!");
  }
};
