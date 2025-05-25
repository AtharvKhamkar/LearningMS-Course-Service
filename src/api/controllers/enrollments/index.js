import { Router } from "express";
import controller from "./controller.js";
import { upload } from "../../middlewares/upload.handler.js";
import tokenService from "../../services/token.service.js";

const router = Router();

router
  .route("/add")
  .post(
    upload.none(),
    tokenService.verifyUserAccessToken,
    controller.enrollCourse
  );

export default router;
