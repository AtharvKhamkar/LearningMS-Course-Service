import { asyncHandler } from "../../common/async_handler.js";
import { statusCodes } from "./constant.handler.js";
import sendResponse from "./response.handler.js";

const checkRole = (requiredRole) => {
  return asyncHandler(async (req, res, next) => {
    try {
      const user = req.user;

      if (user.role != requiredRole && user.role != "ADMIN") {
        return sendResponse(
          req,
          res,
          statusCodes.UNAUTHORIZED_401,
          "You have not permission to access this API route"
        );
      }

      next();
    } catch (error) {
      console.log(`ERROR : RoleHandler.checkRole :: ${error}`);
    }
  });
};

export { checkRole };
