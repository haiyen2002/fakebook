const mongoose = require("../models/dbconnect");
const Backlist = mongoose.Schema(
  {
    token: String,
  },
  { collection: "Backlist" }
);
const BalckList = mongoose.model("Backlist", Backlist);

module.exports = BalckList;
