const mongoose = require("mongoose");
const Review = require("./reviews.js");
const { string } = require("joi");
//Ta k Hm Bar Bar mongoose.Schema na likha
const Schema = mongoose.Schema;
//New Schema name as Listing
const listingSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // category: {
  //   type: String,
  //   required: true,
  // },
  // Mapbox
  // geometry: {
  //   type: String,
  //   enum: ["Point"],
  //   required: true,
  // },
  // coordinates: {
  //   type: [Number],
  //   required: true,
  // },
});

//careating a mongoose middleware for deleting the data from reviews and listing also
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

//Creating Model:
const listing = mongoose.model("listing", listingSchema);

//Exporting This File
module.exports = listing;
