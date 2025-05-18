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

  async publishCourse(postData) {
    const functionName = `PUBLISH_COURSE`;
    const startTime = new Date();
    try {
      const currentTimestamp = new Date();
      let pgQuery = {
        text: `UPDATE tbl_courses SET published = TRUE, published_at = $1 WHERE instructor_id = $2 AND course_id = $3 RETURNING course_id`,
        values: [currentTimestamp, postData.user_id, postData.id],
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

  async getCourseDetail(paramsData) {
    const functionName = `GET_SINGLE_COURSE`;
    const startTime = new Date();

    try {
      let pgQuery = {
        text: `SELECT * FROM tbl_courses WHERE course_id = $1 AND published = true`,
        values: [paramsData],
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

  async updateCourse(postData) {
    const functionName = `UPDATE_COURSE`;
    const startTime = new Date();

    try {
      let pgQuery = {
        text: `SELECT * FROM fn_update_course_details($1, $2, $3, $4, $5, $6)`,
        values: [
          postData.id,
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

  async removeCourse(queryData) {
    const functionName = `REMOVE_COURSE`;
    const startTime = new Date();

    try {
      let pgQuery = {
        text: `DELETE FROM tbl_courses WHERE course_id = $1 AND instructor_id = $2 RETURNING course_id`,
        values: [queryData.id, queryData.user_id],
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
