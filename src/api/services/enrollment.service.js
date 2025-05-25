import logger from '../../common/logger.js';
import utility from '../../common/utility.js';
import postgresDbHandler from '../middlewares/postgres.db.handler.js';

const serviceName = 'ENROLLMENT_SERVICE';

class EnrollmentService{
    async addCourseEnrollment(postData){
        const functionName = 'ADD_COURSE_ENROLLMENT';
        const startTime = new Date();
        try {
            let pgQuery = {
                text: "SELECT * FROM fn_add_course_enrollment($1, $2, $3)",
                values: [
                    postData.role,
                    postData.user_id,
                    postData.course_id
                ]
            }

            const dbResponse = await postgresDbHandler.executeQuery(pgQuery);
            return dbResponse;
        } catch (error) {
            logger.info(`${serviceName}|${functionName} - ERROR, errorMessage - ${error.message}`);
        }finally{
            utility.logQueryTime(serviceName, functionName, null, startTime);
        }
    }
}


export default new EnrollmentService();