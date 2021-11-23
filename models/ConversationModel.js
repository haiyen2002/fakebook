const mongoose = require("./dbconnect");

const ConversationSchema = mongoose.Schema(
  {
    members: Array,
  },
  { timestamps: true }
);

const ConversationModel = mongoose.model("Conversation", ConversationSchema);

module.exports = ConversationModel;
