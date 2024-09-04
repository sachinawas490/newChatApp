import express from 'express';
import { sendMessage,getMessages } from '../controllers/messageController.js';
import protectedRoute from '../config/protectedRoute.js';
const messageRoute = express.Router();
messageRoute.post('/sendMessage/:id',protectedRoute, sendMessage); // Note the `:id` parameter to capture receiverId
messageRoute.get('/getMessage/:id', protectedRoute, getMessages);
export default messageRoute;
