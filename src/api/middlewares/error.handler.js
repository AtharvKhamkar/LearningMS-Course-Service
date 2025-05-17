import { errorMessages, statusCodes } from "./constant.handler.js";


export default function errorHandler(err,req,res,next){
    let errorCode;

    if(err.code){
        errorCode = statusCodes.BAD_REQUEST_400;
        let errMsg = JSON.parse(JSON.stringify(errorMessages.INVALID_REQUEST));
        errMsg.message = err.message;
        res.status(errorCode).send({success: false, error: errMsg, data: null});
    }else if(err.status === 404){
        errorCode = 404;
        res.status(errorCode).send({success: false, error: errorMessages.RESOURCE_NOT_FOUND, data: null});
    }else if(err.errors || err.message){
        errorCode = 400;
        res.status(errorCode).send({success: false, error: errorMessages.INVALID_REQUEST,data: null});
    }else{
        errorCode = 200;
        res.status(errorCode).send({status: 200, error: errorMessages.SERVICE_INVALID_RESPONSE,data: null});
    }
}