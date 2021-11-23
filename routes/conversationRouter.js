const router = require("express").Router();
const ConversationModel = require("../models/ConversationModel");
const MessageModel = require("../models/MessageModel");
const UserModel = require("../models/UserModel");
//new conversation:
router.post("/", async (req, res) => {
  const newConversation = new ConversationModel({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get conv of a user:
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const conversation = await ConversationModel.find({
      members: {
        $in: [userId],
      },
    });
    //get listID:
    var listFriId = [];
    conversation.map((conv) => {
      conv.members.map((m) => {
        if (m !== userId) {
          listFriId.push(m);
        }
      });
    });

    //get friend
    var listFri = [];
    const allUser = await UserModel.find({});
    listFriId.map((fri) => {
      allUser.map((user) => {
        if (JSON.stringify(user._id).includes(fri)) {
          listFri.push(user);
        }
      });
    });
    res.render("pages/messenger/messenger", {
      listFri,
    });
    // res.json(conversation)
  } catch (error) {
    res.status(500).json(error);
  }
});

//get message:
router.post("/:friendId", async (req, res) => {
  try {
    var userId = JSON.stringify(req.user._id)
   
    userId = userId.slice(1, userId.length - 1);
   
    const friendId = req.params.friendId;
  
    //find conv of own user and friend clicked:
    const conv = await ConversationModel.findOne({
      $or: [
        {members: [userId, friendId]},
        {members: [friendId, userId]}
      ]
    })
    
   var convId = conv._id;
   convId = JSON.stringify(convId)
   convId = convId.slice(1, convId.length-1)
 
   //find message by convId:
   const messages = await MessageModel.find({
     conversationId : convId
   })
   
   res.status(200).json({
    messages,convId, userId
   })
   
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
