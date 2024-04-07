const Review = require("../models/reviews.js");
const listing = require("../models/listing.js");
//Review --> -------------------------------------(POST Route)

module.exports.createReview = async (req, res) => {
  //Finding id for particular listing

  let Listing = await listing.findById(req.params.id);
  // Getting Comment and Review from Form Body
  let newReview = new Review(req.body.review);
  // Adding author to the REview
  newReview.author = req.user._id;

  //push this review to the array of Listing
  Listing.reviews.push(newReview);

  // // Save Listing and Review
  await newReview.save();

  await Listing.save();
  req.flash("success", "Review Added Successfully!");

  res.redirect(`/listings/${Listing._id}`);
};
//Review --> -------------------------------------(Delete Route)
module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;

  await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findOneAndDelete(reviewId);
  req.flash("success", "Review Deleted Successfully!");

  res.redirect(`/listings/${id}`);
};
