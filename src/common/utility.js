import logger from './logger.js';
const dbQueryTimeLogger = logger.child({ module : 'DB_QUERY_TIME' });
const dbRedisTimeLogger = logger.child({ module : 'REDIS_TIME' });
const dbErrorLogger = logger.child({ module : 'DB_ERROR' });
const executionTimeLogger = logger.child({ module : 'EXECUTION_TIME' });
const errorLogger = logger.child({ module : 'ERROR' });

class Utility {
	logQueryTime(moduleName, functionName,  customMessage, startTime) {
		dbQueryTimeLogger.info(`${moduleName}|${functionName} :: #message::${customMessage ? customMessage : ''}#responseTime::${new Date().getTime() - startTime}`);
	}

	logRedisTime(moduleName, functionName, customMessage, startTime) {
		dbRedisTimeLogger.info(`${moduleName}|${functionName} :: #message::${customMessage ? customMessage : ''}#responseTime::${new Date().getTime() - startTime}`);
	}

	logExecutionTime(moduleName, functionName, customMessage, startTime) {
		executionTimeLogger.info(`${moduleName}|${functionName} :: #message::${customMessage ? customMessage : ''}#responseTime::${new Date().getTime() - startTime}`);
	}

	logError(moduleName, functionName, error) {
		errorLogger.error(`${moduleName}|${functionName} :: #error::${error}`);
	}

	logDBError(moduleName, functionName, error) {
		dbErrorLogger.error(`${moduleName}|${functionName} :: #error::${error}`);
	}
}

export default new Utility();