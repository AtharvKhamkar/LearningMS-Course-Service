import logger from "../../common/logger.js";
import { errorMessages, statusCodes } from "../middlewares/constant.handler.js";
import sendResponse from "../middlewares/response.handler.js";
import jwt from "jsonwebtoken";

const serviceName = "TOKEN_SERVICE";

class TokenService {
  async verifyUserAccessToken(req, res, next) {
    let functionName = "VERIFY_USER_ACCESS_TOKEN";

    try {
      if(!req.headers["x-access-token"]){
        logger.info(
          `${serviceName}|${functionName}|MISSING_ACCESS_TOKEN for accessToken - ${req.headers["x-access-token"]}`
        );
        return sendResponse(
          req,
          res,
          statusCodes.BAD_REQUEST_400,
          null,
          errorMessages.MISSING_ACCESS_TOKEN
        );
      }
      let decoded = jwt.verify(
          req.headers["x-access-token"],
          process.env.ACCESS_TOKEN_SECRET
        );
        if (decoded) {
          req.user = decoded;
          console.log(req.user); 
          next();
        } else {
          logger.info(
            `${serviceName}|${functionName}|INVALID_ACCESS_TOKEN for accessToken - ${req.headers["x-access-token"]}`
          );
          return sendResponse(
            req,
            res,
            statusCodes.OK_200,
            null,
            errorMessages.INVALID_ACCESS_TOKEN
          );
        }
      
    } catch (error) {
      logger.info(
        `${serviceName}|${functionName} | ERROR for accessToken - ${req.headers["x-access-token"]}`
      );
      if (error.message == "jwt expired") {
        return sendResponse(
          req,
          res,
          statusCodes.UNAUTHORIZED_401,
          null,
          errorMessages.EXPIRED_ACCESS_TOKEN
        );
      } else {
        next(error);
      }
    }
  }
}

export default new TokenService();
