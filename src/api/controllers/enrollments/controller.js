import { statusCodes } from "../../middlewares/constant.handler.js";
import sendResponse from "../../middlewares/response.handler.js";
import logger from "../../../common/logger.js";
import enrollmentService from "../../services/enrollment.service.js";
import mailService from "../../services/mail.service.js";
import moment from "moment";

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

      const { course_id } = req.body;

      const dbResponse = await enrollmentService.addCourseEnrollment({
        role: req.user.role,
        user_id: req.user.user_id,
        course_id: course_id,
      });

      const result = dbResponse[0]?.data?.[0];

      if (!result.enrollment_id) {
        return sendResponse(req, res, statusCodes.OK_200, null, result.message);
      }

      //sending mail to users
      await mailService.sendCourseEnrollmentMail(
        req.user.full_name,
        result.title,
        result.end_date,
        req.user.email_id
      );

      //Formatting to readable dates
      result.start_date = moment(result.start_date).format(
        "MMMM Do YYYY, h:mm:ss a"
      );
      result.end_date = moment(result.end_date).format(
        "MMMM Do YYYY, h:mm:ss a"
      );

      return sendResponse(req, res, statusCodes.OK_200, result, null);
    } catch (error) {
      logger.error(
        `${controllerName}| ${functionName}ERROR, errorMessage - ${error.message}`
      );
    }
  }

  async cancelEnrollment(req, res, next) {
    const functionName = `${controllerName} | CANCEL_ENROLLMENT -`;
    try {
      //Get course_id from the req.params
      //Check role of the user is student or not -> handled by middleware
      //Get enrollment matching using course_id and student_id
      //delete enrollment entry from the tbl_enrollments table
      //Send enrollment cancelled successfully email

      const { course_id } = req.body;

      const dbResponse = await enrollmentService.cancelEnrollment({
        course_id,
        student_id: req.user.user_id,
      });
      const result = dbResponse[0];

      if (!result) {
        return sendResponse(
          req,
          res,
          statusCodes.NOT_FOUND_404,
          null,
          "Enrollment not found"
        );
      }

      await mailService.sendCancelEnrollmentMail(
        req.user.full_name,
        "Sample course name",
        req.user.email_id
      );
      return sendResponse(req, res, statusCodes.OK_200, result, null);
    } catch (error) {
      logger.error(
        `${controllerName}| ${functionName}ERROR, errorMessage - ${error.message}`
      );
    }
  }

  async getAllEnrolledStudentDetail(req, res, next) {
    const functionName = `${controllerName} | GET_ALL_ENROLLED_STUDENT_DETAIL -`;
    try {
      //Get course_id from the req.params
      //Get user id from req.user
      //Check user role is instructor or not that will be handled by middleware
      //User can only check enrolled student if the instructor of the course is itself and passed coursed id using req.params
      //If it is true then only show enrolled student details

      const { id : course_id } = req.params;
      const { user_id } = req.user;

      const dbResponse = await enrollmentService.getAllEnrolledStudentDetail({
        user_id,
        course_id,
      });
      const result = dbResponse[0]?.data?.[0];

      if (result != null && result.valid_user) {
        return sendResponse(
          req,
          res,
          statusCodes.UNAUTHORIZED_401,
          null,
          result.message
        );
      }

      result.start_date = moment(result.start_date).format('MMMM Do YYYY, h:mm:ss a');
      result.end_date = moment(result.end_date).format('MMMM Do YYYY, h:mm:ss a');

      return sendResponse(req, res, statusCodes.OK_200, result, null);
    } catch (error) {
      logger.error(
        `${controllerName}| ${functionName}ERROR, errorMessage - ${error.message}`
      );
    }
  }
}

export default new Controller();
