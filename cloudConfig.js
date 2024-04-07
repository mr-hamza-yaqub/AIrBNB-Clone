//this Files is Basically to Store Our Pictures in Cloud Storage
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
//Config our Cloud Credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
//Making Folder Named as "Wanderlust_DEV" in Cloudinary Storage it Stores  Allowedformat: ["png", "jpg", "jpeg"],
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Wanderlust_DEV",
    Allowedformat: ["png", "jpg", "jpeg"],
  },
});
module.exports = {
  cloudinary,
  storage,
};
