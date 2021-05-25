import express from 'express';
import { createNewRoom, createNewRoom2, getChatRooms } from '../controller/ChatController.js';
import { protect, protect2 } from '../middleware/authMiddleware.js';

const router = express.Router();

// create new room
router.route('/createRoomByRecruiter').post(protect2, createNewRoom2);
router.route('/createNewRoom').post(protect, createNewRoom);
// get chat rooms
router
  .route('/getChatRooms/:userId?recruiter=true')
  .get(protect2, getChatRooms);
router.route('/getChatRooms/:userId').get(protect, getChatRooms);

export default router;
