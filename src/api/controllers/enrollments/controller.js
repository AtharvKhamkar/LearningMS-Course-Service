import { statusCodes } from "../../middlewares/constant.handler.js";
import sendResponse from "../../middlewares/response.handler.js";
import logger from "../../../common/logger.js";
import enrollmentService from "../../services/enrollment.service.js";

const controllerName = "ENROLLMENT_CONTROLLER";

class Controller {
  async enrollCourse(req, res, next) {
    const functionName = `${controllerName} | ENROLL_COURSE - `;
    try {
      //Check whether role of the user is student or not
      //If it is student then check whether user has enrolled for the course or not
      //Pass course_id that student want to enroll
      //Fetch the duration of the course
      //Add current time stamp as a start date and append course duration in the start date and calculate end date
      //send email to the student to confirm enrolled for the course with expiry date
      //send email for the instructor of that course to notify new student has enrolled for the course

      const {course_id} = req.body;

      console.log('Course id before passing it to the addCourseEnrollment function ------->');
      console.log(course_id);
      
      

      const dbResponse = await enrollmentService.addCourseEnrollment({
        role: req.user.role,
        user_id: req.user.user_id,
        course_id: course_id
      });

      const result = dbResponse[0]?.data?.[0];

      console.log('Result of the db response in the Controller.enrollCourse is -------->');
      console.log(result);

      if(!result.enrollment_id){
        return sendResponse(req, res, statusCodes.OK_200, null, result.message);
      }
      
      return sendResponse(
        req,
        res,
        statusCodes.OK_200,
        result,
        null
      );
    } catch (error) {
      logger.error(
        `${controllerName}| ${functionName}ERROR, errorMessage - ${error.message}`
      );
    }
  }
}

export default new Controller();
