const mongoose = require("./dbconnect");

const MessageSchema = mongoose.Schema(
  {
    conversationId: String,
    sender: String,
    text : String,
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("Message", MessageSchema);

module.exports = MessageModel;
