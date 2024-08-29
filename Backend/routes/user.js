import express from 'express';
import { getAllUsers, getById} from '../controllers/user.controller.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// get all and this can be done only by admin
router.get('/', verifyAdmin, getAllUsers);

// get user by id
router.get('/:id', verifyUser, getById);


export default router;