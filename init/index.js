const mongoose = require("mongoose");
const initData = require("./data");
const listing = require("../models/listing.js");
//Established Connection:
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
  .then(() => {
    console.log("Connected TO DB");
  })
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect(MONGO_URL);
}
// This Function is used to CLear Already Placed Data in Database and Isert our New Data:
const initDB = async () => {
  await listing.deleteMany({});
  //Add owner to all Existing Listings
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "65aad199da8e67445549a643",
  }));
  await listing.insertMany(initData.data);
  console.log("Data was Initialized!");
};
initDB();
