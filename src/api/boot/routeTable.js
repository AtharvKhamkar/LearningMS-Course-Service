import Table from "cli-table";
import pino from "pino";
import listEndPoints from "express-list-endpoints";


const LOG_LEVEL = process.env.LOG_LEVEL;

const l = pino({
    level:LOG_LEVEL
});

function printRouteListTable(app){
    const table = new Table({head:['','Path']});
    listEndPoints(app).forEach(route => {
        if(route.path != '*'){
            const row = {};
            row[`${route.methods.join(', ')}`] = route.path;
            table.push(row);
        }
    });
    l.info(`\n${table.toString()}`);
}

export default printRouteListTable;