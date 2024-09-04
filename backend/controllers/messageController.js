import { Conversation } from '../model/consersation.js';
import { Message } from '../model/message.js';

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.userid;
        const receiverId = req.params.id;
        const { message } = req.body;
        console.log(senderId, "  --  ", receiverId, "  --   ", message);

        if (!senderId || !receiverId || !message) {
            return res.status(401).json("something is missing in message sender ");
       }

        let temp = new Message({
            senderId, receiverId, message
        });
        let newMes =await temp.save();
        console.log(newMes)
        if (!newMes) {
            return res.status(401).json({ "message": "error occurs during communication" });
        }
        res.status(201).json({ "message": newMes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to send message' });
    }
};

export const getMessages = async (req, res) => {
    try {
        const userId = req.userid; // Assuming user ID is extracted from the request (e.g., through middleware)
        const receiverId = req.params.id;
      
        if (!userId || !receiverId) {
            return res.status(400).json({ message: "User ID or Receiver ID is missing" });
        }

        // Find messages where the user is either the sender or receiver and the other party is the receiver or sender
        const messages = await Message.find({
            $or: [
                { senderId: userId, receiverId: receiverId },
                { senderId: receiverId, receiverId: userId }
            ]
        }).sort({ createdAt: 1 }); // Sort messages by creation time in ascending order
        console.log("message s  ", messages);
        if (messages.length === 0) {
            return res.status(404).json({ message: "No messages found between these users" });
        }

        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to retrieve messages' });
    }
};