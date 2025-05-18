import { Router } from "express";
import controller from "./controller.js";
import tokenService from "../../services/token.service.js";
import { upload } from "../../middlewares/upload.handler.js";


const router = Router();
router.route('/add').post(upload.none(),tokenService.verifyUserAccessToken,controller.addCourse);
router.route('/publish/:id').put(upload.none(),tokenService.verifyUserAccessToken,controller.publishCourse);
router.route('/:id').get(upload.none(),tokenService.verifyUserAccessToken,controller.getCourseDetail);
router.route('/:id').put(upload.none(),tokenService.verifyUserAccessToken, controller.updateCourse);
router.route('/:id').delete(upload.none(), tokenService.verifyUserAccessToken,controller.removeCourse);


export default router;