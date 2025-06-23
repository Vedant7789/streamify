import express from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { getMyFriends,getRecommendedUsers} from "../controllers/users.controller.js";
const router=express.Router();


router.use(protectRoute);
router.get("/",getRecommendedUsers)
router.get("/friends",getMyFriends)
router.post("/friend-request/:id",sendFriendRequest);
export default router;