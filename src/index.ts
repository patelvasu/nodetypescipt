import express,{Application} from 'express';
import { createServer,Server } from 'http';
import path from 'path';
import './Config/config'
import './Config/logging'
import { corsHandler } from './middleware/corsHandler';
import { loggingHandler } from './middleware/loggingHandler';
import database from './Config/database';
import redisConnection from './Config/redisConnection';
import router from './Routers/routes';
import IORedisConnection from './Config/redisIOConnection';
import errorHandler from './middleware/errorHandler';
const app:Application = express();
const server:Server=createServer(app);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

logging.info('Loggin and Cors Configurations');
app.use(loggingHandler)
app.use(corsHandler);
app.use(express.static(path.join(__dirname, 'public')));

logging.info('Database Configurations');
database.dbConnect();

logging.info('Redis Configurations');
import redisMethods from './Catch/redisMethods';
import { generateKey } from './Catch/keyGenerator';
(async () => {
   const usrkey=await generateKey('Alien','fruits')
   const set = await redisMethods.storeArray(usrkey,['Apple',"Banana"]);
   logging.info("set",set);
   
//    const seta = await client.set('shiv', 'patel');
//    logging.info(seta);
   const seta1 = await redisMethods.getArrayPaginated(usrkey,0,1);
   logging.info("seta1",seta1);
})();

logging.info('Routing Controllers');
app.use(router);

logging.info('Error Handler');
app.use(errorHandler)

server.listen(process.env.PORT, () => { 
    logging.info('----------------------------------------------');
    logging.info(`server is running on port ${process.env.PORT}`);
    logging.info('----------------------------------------------');
})
