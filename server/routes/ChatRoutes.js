import express from 'express';
import { createNewRoom, getChatRooms } from '../controller/ChatController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// routes create new room
router.route('/createNewRoom').post(protect, createNewRoom);
// get chat rooms
router.route('/getChatRooms/:userId').get(protect, getChatRooms);

export default router;
