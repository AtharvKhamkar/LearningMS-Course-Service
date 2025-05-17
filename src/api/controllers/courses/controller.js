import { statusCodes } from "../../middlewares/constant.handler.js";
import sendResponse from "../../middlewares/response.handler.js";

const controllerName = 'COURSES_CONTROLLER';

class Controller{
    async register(req, res, next){
        const functionName = `${controllerName} | REGISTER - `;

        return sendResponse(req,res,statusCodes.OK_200,null);
        

    }

}

export default new Controller();