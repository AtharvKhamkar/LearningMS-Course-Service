import fs from "fs";
import { sendMail } from "../middlewares/mail.handler.js";
import moment from "moment";

class MailService {
  async sendCourseEnrollmentMail(
    full_name,
    course_name,
    course_end_date,
    email_id
  ) {
    try {

      let cwd = process.cwd();
      let filePath = `${cwd}/src/api/templates/enrollment_welcome.html`;

      fs.readFile(filePath, { encoding: "utf-8" }, async function (err, data) {
        if (!err) {
          let mailBody = data
            .replace(/#full_name/gi, full_name)
            .replace(/#course_name/gi, course_name)
            .replace(/#course_end_date/gi, moment(course_end_date).format('MMMM Do YYYY, h:mm:ss a'));

          await sendMail(email_id, null, null, "Course Enrollment", mailBody);
        } else {
          console.log(
            `ERROR : MailService.sendCourseEnrollment ${err.message}`
          );
        }
      });
    } catch (error) {
      console.log(`ERROR : MailService.sendCourseEnrollmentMail :: ${error}`);
    }
  }

  async sendCancelEnrollmentMail(
    full_name,
    course_name,
    email_id
  ) {
    try {

      let cwd = process.cwd();
      let filePath = `${cwd}/src/api/templates/enrollment_cancel.html`;

      fs.readFile(filePath, { encoding: "utf-8" }, async function (err, data) {
        if (!err) {
          let mailBody = data
            .replace(/#full_name/gi, full_name)
            .replace(/#course_name/gi, course_name);

          await sendMail(email_id, null, null, "Course Enrollment", mailBody);
        } else {
          console.log(
            `ERROR : MailService.sendCancelEnrollmentMail ${err.message}`
          );
        }
      });
    } catch (error) {
      console.log(`ERROR : MailService.sendCancelEnrollmentMail :: ${error}`);
    }
  }
}

export default new MailService();
