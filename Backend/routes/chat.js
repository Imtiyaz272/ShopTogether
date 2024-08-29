import express from 'express';
import { getChat } from '../controllers/socket.controller.js';

const router = express.Router();

router.get('/getChat/:chatId', getChat);

export default router;