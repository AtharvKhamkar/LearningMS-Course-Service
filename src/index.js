import startApp  from "./api/boot/boot.js";
import logger from "./common/logger.js"
import postgresDbHandler from "./api/middlewares/postgres.db.handler.js"

let appHandler;

const exit = process.exit;


(async() => {
  try {
    postgresDbHandler.connectToDatabase();
    appHandler = await startApp();
    logger.info('BOOT :: serverless application booted successfully!');
  } catch (error) {
    logger.info(`BOOT :: Error while booting serverless application :: message : ${error.message} :: stack : ${error.stack}`);
    exit(1);
  }
})();


//Required AWS lambda entry
export const handler = async(event,context) => {
  return appHandler(event,context);
} 