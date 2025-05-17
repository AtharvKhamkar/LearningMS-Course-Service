import bootLogger from "../../common/logger.js";

export default function sendResponse(req,res,statusCode, successData, errorData){
    try {
        if(successData){
            res.status(statusCode).send({
                success: true,
                error: null,
                data: successData
            })
        }else{
            bootLogger.info(`SENDRESPONSE|reqMethod - ${req ? req.method : 'N/A'}, originalUrl - ${req ? req.originalUrl : 'N/A'}, errorData - ${JSON.stringify(errorData)}`);
            res.status(statusCode).send({
                success: false,
                error: errorData,
                data: null
            })

        }
    } catch (error) {
        bootLogger.info(`Error in the sendResponse function :: message : ${error.message} :: stack : ${error.stack}`);
    }
}