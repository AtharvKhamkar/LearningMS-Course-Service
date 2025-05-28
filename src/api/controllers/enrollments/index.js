import { Router } from "express";
import controller from "./controller.js";
import { upload } from "../../middlewares/upload.handler.js";
import tokenService from "../../services/token.service.js";
import { checkRole } from "../../middlewares/role.handler.js";
import { Roles } from "../../middlewares/constant.handler.js";

const router = Router();

router
  .route("/add")
  .post(
    upload.none(),
    tokenService.verifyUserAccessToken,
    checkRole(Roles.STUDENT),
    controller.enrollCourse
  );

router
  .route("/:id")
  .get(
    tokenService.verifyUserAccessToken,
    checkRole(Roles.INSTRUCTOR),
    controller.getAllEnrolledStudentDetail
  );

router
  .route("/")
  .delete(
    upload.none(),
    tokenService.verifyUserAccessToken,
    checkRole(Roles.STUDENT),
    controller.cancelEnrollment
  );

export default router;
