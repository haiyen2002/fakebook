const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/messageDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose;