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

    async cancelEnrollment(postData){
        const functionName = 'CANCEL_ENROLLMENT';
        const startTime = new Date();
        try {
            let pgQuery = {
                text: "DELETE FROM tbl_enrollments WHERE course_id = $1 AND student_id = $2 RETURNING enrollment_id",
                values: [
                    postData.course_id,
                    postData.student_id,
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

    async getAllEnrolledStudentDetail(postData){
        const functionName = 'GET_ALL_ENROLLED_STUDENT_DETAILS';
        const startTime = new Date();
        try {
            let pgQuery = {
                text: 'SELECT * FROM fn_get_enrolled_student_details($1, $2)',
                values:[
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