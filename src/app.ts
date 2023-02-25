import Express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import { routers } from './routers.js';
import { CONFIG } from './config/config.js';

// express/helmet/cors
const app = Express();
app.use(helmet());
app.use(cors());

//body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// port
const port = CONFIG.PORT;
// const user = process.env.USER ? process.env.USER : 'default';
const hostName = CONFIG.HOSTNAME;

// route settings in routers.ts
app.use('/', routers);

// No match uri
app.use((req, res) => {
    res.status(404).send({ status: 404, message: 'NOT FOUND' });
});

// launch server.
app.listen(port, hostName);
