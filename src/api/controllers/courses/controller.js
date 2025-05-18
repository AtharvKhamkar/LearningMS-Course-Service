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

  async publishCourse(req, res, next) {
    const functionName = `${controllerName} | PUBLISH_COURSE - `;

    try {
      const { id } = req.params;
      const dbResponse = await courseService.publishCourse({ ...req.user, id });
      const result = dbResponse[0]?.course_id;

      if (!result) {
        return sendResponse(
          req,
          res,
          statusCodes.INTERNAL_SERVER_ERROR_500,
          null,
          errorMessages.INTERNAL_SERVER_ERROR
        );
      }

      return sendResponse(
        req,
        res,
        statusCodes.OK_200,
        "Course published successfully",
        null
      );
    } catch (error) {
      logger.error(
        `${controllerName}| ${functionName}ERROR, errorMessage - ${error.message}`
      );
      next(error);
    }
  }

  async getCourseDetail(req, res, next) {
    const functionName = `${controllerName} | GET_SINGLE_COURSE - `;

    try {
      const { id } = req.params;
      const dbResponse = await courseService.getCourseDetail(id);
      const result = dbResponse[0];

      if (!result) {
        return sendResponse(
          req,
          res,
          statusCodes.INTERNAL_SERVER_ERROR_500,
          null,
          errorMessages.INTERNAL_SERVER_ERROR
        );
      }

      return sendResponse(req, res, statusCodes.OK_200, result, null);
    } catch (error) {
      logger.error(
        `${controllerName}| ${functionName}ERROR, errorMessage - ${error.message}`
      );
      next(error);
    }
  }

  async updateCourse(req, res, next){
    const functionName = `${controllerName} | UPDATE_COURSE`;

    try {
      const {id} = req.params;
      const dbResponse = await courseService.updateCourse({...req.body, id, ...req.user});
      const result = dbResponse[0]?.data?.[0];

      if(!result){
        return sendResponse(
          req,
          res,
          statusCodes.INTERNAL_SERVER_ERROR_500,
          null,
          errorMessages.INTERNAL_SERVER_ERROR
        );
      }
      
      return sendResponse(req, res, statusCodes.OK_200, result, null);
    } catch (error) {
      logger.error(
        `${controllerName}| ${functionName}ERROR, errorMessage - ${error.message}`
      );
      next(error);
    }
  }
  

  async removeCourse(req, res, next) {
    const functionName = `${controllerName} | REMOVE_COURSE - `;

    try {
      const { id } = req.params;
      const dbResponse = await courseService.removeCourse({ id, ...req.user });
      const result = dbResponse[0];

      if (!result) {
        return sendResponse(
          req,
          res,
          statusCodes.INTERNAL_SERVER_ERROR_500,
          null,
          errorMessages.INTERNAL_SERVER_ERROR
        );
      }

      return sendResponse(
        req,
        res,
        statusCodes.OK_200,
        "Course removed successfully",
        null
      );
    } catch (error) {
      logger.error(
        `${controllerName}| ${functionName}ERROR, errorMessage - ${error.message}`
      );
      next(error);
    }
  }
}

export default new Controller();
