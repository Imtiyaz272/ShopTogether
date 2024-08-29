import express from 'express';
import Role from '../models/Role.js';
import mongoose from 'mongoose';
import { createRole, deleteRole, getAllRoles, updateRole } from '../controllers/role.controller.js';

const router = express.Router();

//Create a new role in DB 
router.post('/create', createRole);

//Update role in DB
router.put('/update/:id', updateRole);

//Get all the roles from DB 
router.get('/getAll', getAllRoles);

//Delete a role from DB 
router.delete("/deleteRole/:id", deleteRole);
export default router;