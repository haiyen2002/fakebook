const mongoose = require("./dbconnect");

const UserSchema = mongoose.Schema(
  {
    userName: String,
    password : String,
    email: String,
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
