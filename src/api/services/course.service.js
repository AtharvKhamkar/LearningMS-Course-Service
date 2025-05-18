import postgresDbHandler from "../middlewares/postgres.db.handler.js";
import logger from "../../common/logger.js";
import utility from "../../common/utility.js";

const serviceName = "COURSE_SERVICE";

class CourseService {
  async addCourse(postData) {
    const functionName = `ADD_COURSE`;
    const startTime = new Date();
    try {
      let pgQuery = {
        text: "SELECT * FROM fn_add_course($1, $2, $3, $4, $5, $6)",
        values: [
          postData.role,
          postData.user_id,
          postData.title,
          postData.description,
          postData.duration,
          Number(postData.price),
        ],
      };

      const dbResponse = await postgresDbHandler.executeQuery(pgQuery);
      return dbResponse;
    } catch (error) {
      logger.info(
        `${serviceName}|${functionName} - ERROR, errorMessage - ${error.message}`
      );
    } finally {
      utility.logQueryTime(serviceName, functionName, null, startTime);
    }
  }
}

export default new CourseService();
