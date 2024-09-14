import express from "express";

const router = express.Router();
import { userController } from "../controllers/userController.js";

router.get("/", userController.home);
router.get("/log", userController.log);
router.post("/log", userController.verifyLogin);
router.get("/reg", userController.reg);
router.post("/reg", userController.createUserDoc);

// module.exports=router;
export default router;
