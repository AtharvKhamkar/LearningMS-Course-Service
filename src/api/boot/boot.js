import bodyParser from "body-parser";
import logger from "../../common/logger.js"
import express from "express";
import http from "http";
import cors from 'cors';
import sendResponse from "../middlewares/response.handler.js";
import { errorMessages, statusCodes } from "../middlewares/constant.handler.js";
import courseRouter from "../controllers/courses/index.js";
import printRouteListTable from "./routeTable.js";
import Connections from "../middlewares/connection.handler.js";
import postgresDbHandler from "../middlewares/postgres.db.handler.js";
import { error } from "console";
import { exit } from "process";
import Serverless from "serverless-http";
const PORT = process.env.PORT;
const HOST = process.env.HOST;

const bootLogger = logger.child({module:'BOOT'});

bootLogger.info('Initializing express app');

const app = express();

const server = http.createServer(app);

let isAppInitialized = false;
let serverlessHandler;

const registerCoreMiddleware = function(){
    try {
        if(isAppInitialized) return;

        bootLogger.info('Register middleware started');
        bootLogger.info('Registering shutdown handler');
		// setupGracefulShutdown();
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended:true}));
        bootLogger.info('Registered middleware: BodyParser');

        app.use(cors({credentials:true,origin:true}));
        app.options('*',cors());
        bootLogger.info('Registered middleware: cors');

        bootLogger.info('Register middleware done');

    } catch (error) {
        bootLogger.error(`BOOT :: Error while registering core middlewares. check core middleware :: message : ${error.message} :: ${error.stack}`);
        throw error;
    }
};

const setupGracefulShutdown = () => {
	const healthCheck = async () => {
		let { postgresDBConnected } = Connections.get();
		if (!postgresDBConnected) {
			throw new HealthCheckError('healthcheck failed');
		}
		return { healthy : true };
	};

	const onShutdown = async () => {
		bootLogger.info('GRACEFUL SHUTDOWN :: Received shutdown signal');
		postgresDbHandler.endPool();
		// masterDataClient.disconnect();
		return Promise.resolve({});
	};

	const terminusOptions = {
		healthChecks : {
			'/health' : healthCheck,
			verbatim : true
		},
		timeout : 5000,
		signals : ['SIGTERM', 'SIGINT'],
		onSignal : onShutdown,
		logger : logger.error.bind(logger)
	};
	// @ts-ignore
	createTerminus(server, terminusOptions);
};

//register all the routes in the application
const registerRoutes = function(){
    try {
        bootLogger.info('Register route middleware started');
        

        //Uncomment while intializing postgreSQL
        // app.use((req,res,next) => {
        //     // await postgresDbHandler.connectToDatabase();
        //     console.log(`value of the connection.get is ${Connections.get()}`);

            
        //     let {postgresDBConnected} = Connections.get() || {};
        //     if(!postgresDBConnected){
        //         bootLogger.info(`Postgres DB connection failed :: postgresDBConnected :: ${postgresDBConnected}`);
        //         return sendResponse(req,res, statusCodes.INTERNAL_SERVER_ERROR_500,null,errorMessages.INTERNAL_SERVER_ERROR);
        //     }
        //     next();
        // })

        app.use((req, res, next) => {
            if (!postgresDbHandler.isDbConnected()) {
                return res.status(500).json({ message: 'Database not connected' });
            }
            next();
        });

        app.use('/health',(req,res) => {
            console.log('Healcheck route success');
            
            return sendResponse(req, res, statusCodes.OK_200, 'Health Check Success', null);
        })

        // app.use('/v1',apiRouter);
        app.use('/v1/course',courseRouter);


        bootLogger.info('Registered the following routes');
        printRouteListTable(app);
        bootLogger.info('Registering routes done');
    } catch (error) {
        bootLogger.error(`BOOT :: Error while registering routes. check register route middleware :: message : ${error.message} :: stack : ${error.stack}`);
        throw error;
    }
}

const handleError = () => {
    process.on('uncaughtException', function(err){
        bootLogger.error(`UNCAOUGHT EXCEPTION OCCURRED :: message : ${err.message} : Message: ${err.message} : stack:: ${error.stack}`);
        exit(1);
    })
}

const startApp = async() => {
    try {
        //register core application level middlewares
        registerCoreMiddleware();

        //register routes
        registerRoutes();

        // app.use(errorHandler);

        // app.use((req,res,next) => {
        //     res.status(404).send({success: false, error:errorMessages.RESOURCE_NOT_FOUND,data: null});
        // })
        
        //exit on uncaught exception
        handleError();

        isAppInitialized = true;

        serverlessHandler = Serverless(app);
        bootLogger.info('App initialized for serverless.');
        return serverlessHandler;
    } catch (error) {
        bootLogger.info(`BOOT :: error while booting application from boot script : ${error.message}`);
        throw err;
    }
}



export default startApp;