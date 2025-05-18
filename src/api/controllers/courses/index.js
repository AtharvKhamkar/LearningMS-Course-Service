import { Router } from "express";
import controller from "./controller.js";
import tokenService from "../../services/token.service.js";
import { upload } from "../../middlewares/upload.handler.js";


const router = Router();

router.route('/add').post(upload.none(),tokenService.verifyUserAccessToken,controller.addCourse);

export default router;