const mongoose = require("mongoose");
//Ta k Hm Bar Bar mongoose.Schema na likha
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
// passport-local-mongoose automatically generate a password and username field for our user with hashing and salting functionality
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});
//Below Plugin generate username and password automatically for our user:
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
