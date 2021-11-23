const router = require("express").Router();
const MessageModel = require("../models/MessageModel");

//add:
router.post("/",async (req,res)=>{
    const newMess = new MessageModel(req.body)
try { 
    const saveMess = await newMess.save();
    res.status(200).json({saveMess,status: 200})
} catch (error) {
    res.status(500).json(error)
}
})

//get
router.get("/:conversationId",async (req,res) => {
    try {
        const messages = await MessageModel.find({
            conversationId : req.params.conversationId
        })
        res.status(200).json(messages)
        
    } catch (error) {
    res.status(500).json(error)
        
    }
})




module.exports = router;
