import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';
import roleRoute from './routes/role.js';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import productRoute from './routes/product.js';
import { seedProductData } from './seed.js';
import { Server } from 'socket.io';
import handleSocketEvents from './controllers/socket.controller.js';
import chatRoute from './routes/chat.js';


const app = express();
dotenv.config();
const server = http.createServer(app);
const io = new Server(server,{
  cors: {
      origin: 'http://localhost:4200', 
      methods: ['GET', 'POST'],
      credentials: true
  }
});

app.use(express.json());   
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:4200',
     credentials: true   // bcoz we are using cookies for validation
}));

app.use("/api/role", roleRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/chat", chatRoute);

app.use((obj, req, res, next) => {
    const statusCode = obj.status || 500;
    const message = obj.message || "Something went wrong";
    return res.status(statusCode).json({
        success:[200,201, 204].some(a=> a=== obj.status)? true : false,
        status:statusCode,
        message:message,
        data: obj.data
    });
});


app.get('/', (res) => {
  res.send('Welcome to the API');
});


io.on('connection', (socket)=>{
  console.log("A new user has connected", socket.id);

  handleSocketEvents(socket,io);
  // socket.on('join-chat',(chatId) => {
  //   socket.join(chatId);
  // })

  // socket.on('user-message', (data)=>{
  //   io.to(data.chatId).emit('recieved-message', data.message);
  // })
});


const connectMongoDB = async ()=>{
    try {
      await mongoose.connect(process.env.MONGO_URL);
      if(process.argv.includes("--seed")){
        await seedProductData();
      }
      console.log('Connected to database!');
  } 
  catch (error) {
      throw error;
  }
}

server.listen(3000, ()=>{
  connectMongoDB();
  console.log("Connected to backend!");
})  

