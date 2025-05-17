import pkg from 'pg';
const { Pool } = pkg;
import logger from '../../common/logger.js';

const dbLogger = logger.child({module:'DATABASE'});
const dbConnectionString = process.env.DATABASE_URL;

var pgPool = {};
let isConnected = false;

class PostgresDBHandler {
    connectToDatabase() {
        if (isConnected && pgPool) {
            dbLogger.info('PostgresDB already connected. Skipping reinitialization.');
            return;
        }

        dbLogger.info(`Initializing PostgresDB pool`);
        pgPool = new Pool({
            connectionString: dbConnectionString,
            ssl: { rejectUnauthorized: false }, // Required for Neon
        });

        dbLogger.info('PostgresDB database connected!');
        isConnected = true; // trust the pool to handle connections dynamically
    }

    async executeQuery(query) {
        if (!pgPool) throw new Error('Postgres pool not initialized');

        const client = await pgPool.connect();
        try {
            dbLogger.info(`Executing query:\n${JSON.stringify(query, null, 2)}`);
            const result = await client.query(query);
            return result.rows;
        } catch (error) {
            dbLogger.error(`Query failed: ${error.message}`);
            throw error;
        } finally {
            client.release();
        }
    }

    async endPool() {
        if (pgPool) {
            await pgPool.end();
            pgPool = null;
            isConnected = false;
            dbLogger.info('Postgres pool closed');
        }
    }

    isDbConnected() {
        return !!pgPool && isConnected;
    }
}

export default new PostgresDBHandler();


