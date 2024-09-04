import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './config/dbconnection.js';
import userrouter from './routes/userRoute.js';
import messageRoute from './routes/messageRoute.js';
import { Server } from "socket.io";
dotenv.config();
import {Message} from './model/message.js'

const app = express();
const server = http.createServer(app);
// Middleware
app.use(express.json());
app.use(cors());
// Routes
app.use('/user/', userrouter);
app.use('/message/', messageRoute);

// Database connection
db();
//

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173'],
        methods: ['GET', 'POST'],
    }
})
const connectedUser = [];
let total = 0;

io.on('connection',async (socket) => {

    const userId = socket.handshake.query.userId;
    total++;
    console.log('new socket is connected ', socket.id, " scoket id name ", userId," total user ",total);
    if (userId !== undefined) {
        connectedUser[userId] = socket.id;
    }
    io.emit('getOnlineUser', Object.keys(connectedUser));
    socket.on('privateMessage',async (newMessage) => {
        const receiverId = newMessage.receiverId;
        const receiverSocketId = connectedUser[receiverId];
        console.log("private message ", newMessage);
        if (receiverSocketId) {
            try {
                const newMes = new Message({
                    senderId: newMessage.senderId,
                    receiverId: newMessage.receiverId,
                    message: newMessage.message
                });
                const temp = await newMes.save();
                if (temp) {
                    newMessage = temp;
                    io.to(receiverSocketId).emit('newMessage',newMessage );
                }
                console.log("new message from sender", newMes);
            } catch (error) {
                console.log(error)
            }
            
        } else {
            console.log(`User with ID ${receiverId} is not connected.`);
        }
    });
    socket.on('disconnect', () => {
        console.log('User disconnected: ', socket.id, " User ID: ", userId);
        delete connectedUser[userId];
        total--;
        io.emit('getOnlineUser',total, Object.keys(connectedUser)); // Update online users list
    });
})

// Start the server
const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log("Server is started at port", port);
});
