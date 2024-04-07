const express = require("express");
//Merger param is used to get id from parent app.js
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");

const {
  ValidateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

//Review --> (POST Route)
router.post(
  "/",
  ValidateReview,
  isLoggedIn,
  wrapAsync(reviewController.createReview)
);
//Review --> (Delete Route)

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.deleteReview)
);
module.exports = router;
