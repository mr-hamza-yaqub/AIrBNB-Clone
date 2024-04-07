// Double Dots .. means requiring parent directory
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, Validatelisting } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
//Router.route is used for defining all routes for same request below both routes have same '/' route
// =============================================================================
router
  .route("/")
  //--------------------------------------Index Route
  .get(wrapAsync(listingController.index))
  //------------------------------------Create Route
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    Validatelisting,
    wrapAsync(listingController.createListing)
  )
  .get(wrapAsync(listingController.search));

// =============================================================================
//New Route(New Route Should be Before the /:id other we face error)
router.get("/new", isLoggedIn, listingController.renderNewForm);
// =============================================================================
router
  .route("/:id")
  // -------------------------------------Show Route
  .get(wrapAsync(listingController.showListings))
  // ------------------------------------Update Route
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    Validatelisting,
    wrapAsync(listingController.updateListing)
  )
  //------------------------------------Delete Route
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));
// =============================================================================
//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
