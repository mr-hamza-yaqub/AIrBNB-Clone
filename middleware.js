const listing = require("./models/listing.js");
const Review = require("./models/reviews.js");

const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged In to perform this action");
    return res.redirect("/login");
  }
  next();
};
//if we are in add new listing page and web ask us to login first then after login we redirect to same url
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};
module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  //Update Krne se Pehle Check kr rhe he k kia jo listing ko edit kr rha he kia wo current user he jisne listing ko Create kia he
  let Listing = await listing.findById(id);
  if (!Listing.owner.equals(res.locals.CurrentUser._id)) {
    req.flash("error", "You are not owner of this Listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
//listing--- Joi Schema

module.exports.Validatelisting = (req, res, next) => {
  // Check all Fields of FOrm That they are valid with our schema we use joi npm package:
  let { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};
//Review--- Joi Schema

module.exports.ValidateReview = (req, res, next) => {
  // Check all Fields of FOrm That they are valid with our schema we use joi npm package:
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  //Update Krne se Pehle Check kr rhe he k kia jo listing ko edit kr rha he kia wo current user he jisne listing ko Create kia he
  let review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.CurrentUser._id)) {
    req.flash("error", "You are not owner of this Listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
