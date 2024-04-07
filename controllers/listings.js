const listing = require("../models/listing.js");
//---------------------------Index Route----------------------------------
module.exports.index = async (req, res) => {
  const alllistings = await listing.find({});
  res.render("listings/index.ejs", { alllistings });
};
//New Route------------Render a Form TO Add Listing----------------------
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};
//----------------------------Create Route-----------------------------
module.exports.createListing = async (req, res, next) => {
  //  MapBox
  // let response = await geocodingClient
  //   .forwardGeocode({
  //     query: req.body.listing.location,
  //     limit: 1,
  //   })
  //   .send();
  //Malter ANd Cloudinary
  let url = req.file.path;
  let filename = req.file.filename;
  //ANother method of doing the same thing as above line here the listing with .body is addedd to the name of each form entity as liting[title],liting[price]liting[image]etc

  const newListing = new listing(req.body.listing);
  //Defining a Username For the the database bcz it is added in 2nd phase
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  // newListing.geometry = response.body.features[0].geometry;
  await newListing.save();

  req.flash("success", "New Listing Added Successfully!");
  res.redirect("/listings");
};
//------------------------------Show Route--------------------------------
module.exports.showListings = async (req, res) => {
  let { id } = req.params;
  //.populate is used show reviews on the show page:
  const Listing = await listing
    .findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!Listing) {
    req.flash("error", "Listing You are requesting is not Exist!");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { Listing });
};
//-----------------------------------Edit Route---------------------------
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const Listing = await listing.findById(id);
  if (!Listing) {
    req.flash("error", "Listing You are requesting is not Exist!");
    res.redirect("/listings");
  }
  //Change the URl Of image in Edit Page replce the width of original to w-250
  let OriginalimgUrl = Listing.image.url;
  OriginalimgUrl = OriginalimgUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { Listing, OriginalimgUrl });
};
// -------------------------Update Route-------------------------------------

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  let Updatelisting = await listing.findByIdAndUpdate(id, {
    ...req.body.listing,
  });
  // Check Weather our file is exist if exist then update image
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    Updatelisting.image = { url, filename };
    await Updatelisting.save();
  }

  req.flash("success", "Listing Updated Successfully!");

  res.redirect(`/listings/${id}`);
};
// -------------------------Delete Route-------------------------------------

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let delte = await listing.findByIdAndDelete(id);
  console.log(delte);
  req.flash("success", "Listing Deleted Successfully!");

  res.redirect(`/listings`);
};
// Search Functionality
// module.exports.search = async (req, res) => {
//   res.send("eokr");
// };
