import {
  errorMessages,
  statusCodes,
} from "../../middlewares/constant.handler.js";
import sendResponse from "../../middlewares/response.handler.js";
import courseService from "../../services/course.service.js";
import logger from "../../../common/logger.js";

const controllerName = "COURSES_CONTROLLER";

class Controller {
  async addCourse(req, res, next) {
    const functionName = `${controllerName} | ADD_COURSE - `;
    // First use middleware to check whether user is instructor or not
    //Get title, description, duration, price, published from req.body
    //Check if the given title is present in the DB or not
    //If it is not then Create Course.
    //Pass average of the ratings in the response & Total count of the reviews for that respective course

    try {
      const dbResponse = await courseService.addCourse({
        ...req.body,
        user_id: req.user.user_id,
      });
      const result = dbResponse[0]?.data?.[0];
      
      if (!result) {
        return sendResponse(
          req,
          res,
          statusCodes.INTERNAL_SERVER_ERROR_500,
          null,
          errorMessages.INTERNAL_SERVER_ERROR
        );
      }

      if (result.course_id == null) {
        return sendResponse(req, res, statusCodes.OK_200, null, result.message);
      }

      return sendResponse(req, res, statusCodes.OK_200, result, null);
    } catch (error) {
      logger.error(
        `${controllerName}| ${functionName}ERROR, errorMessage - ${error.message}`
      );
      next(error);
    }
  }
}

export default new Controller();
