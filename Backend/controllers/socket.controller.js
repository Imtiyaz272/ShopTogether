import { Socket } from "socket.io"
import User from '../models/user.js';
import Chat from "../models/chat.js";

export default function handleSocketEvents(socket,io){
    
    socket.on('join-chat',(chatId) => {
        if(!chatId)
        {
            console.log('No such chat exists');
            return;
        }
        socket.join(chatId);
        console.log(`${socket.id} has joined the chat`);
    });

    socket.on('user-message',async(data)=>{
        try {
            const {chatId, senderId, message} = data;
            console.log(`chatID : ${chatId}`);
            console.log(`senderId : ${senderId}`);
            console.log(`message : ${message}`);
            const sender = await User.findById(senderId);
            
            const chat = await Chat.findById(chatId);
            if(!chat)
            {
                console.log('No such chat is found');
            }

            chat.messages.push({
                sender:senderId,
                message:message
            });

            await chat.save();
            socket.broadcast.to(chatId).emit('recieved-message',{sender,message});
            // io.socket.in(chatId).emit('recieved-message',message);
        } catch (error) {
            console.log('Error saving message');
        }
    });

}

export const getChat = async(req, res, next) => {
    try {
        const chatId = req.params.chatId;
        if(!chatId)
        {
            console.log('No such chat Id found');
        }
        const chat = await Chat.findById(chatId);
        res.status(200).json(chat);
    } catch (error) {
        console.log('Error occured while fetching the chat');
    }
   
}