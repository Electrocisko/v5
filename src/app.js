import express from 'express';
import __dirname from './helpers/utils.js';
import dotenvConfig from './config/dotenv.config.js';
import logger from './config/winston.config.js';
import viewsRouter from './routes/views.router.js';
import usersRouter from './routes/users.router.js';
import cartsRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js';
import sessionsRouter from './routes/sessions.router.js';
import messagesRouter from './routes/messages.router.js';
import ordersRouter from './routes/orders.router.js';
import cookieParser from "cookie-parser";
import initializePassport from './config/passport.config.js';
import passport from 'passport';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import os from 'os';
import cluster from 'cluster';


//initializations
const CPUs = os.cpus().length;
const PORT = dotenvConfig.app.PORT;
const HOST = dotenvConfig.app.HOST ;
const app = express();
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'API ecommerce-CoderHouse',
            description: 'https://github.com/Electrocisko/Proyecto-ecommerce-v4-Coderhouse#readme'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
};
const specs =  swaggerJsdoc(swaggerOptions)


// Template config engine
app.set('views',__dirname+'/views');
app.set('view engine', 'ejs');

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());


//static files
app.use("/", express.static(__dirname + "/public"));

// routes
app.use('/',viewsRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
app.use(function (req, res, next) {
    res.status(404).send({
      message: "Error route not implemented",
    });
  });

//starting de server with cluster
if(cluster.isPrimary) {
    logger.log('info',`Process Primary ${process.pid}`)
    for(let i=0; i<CPUs; i++) {
        cluster.fork();
    }
}
else {
    app.listen(PORT, () => {
        logger.log('info',`Process worker ${process.pid}`)
        logger.log('info',`Server listen in http://${HOST}:${PORT}`)
    });
}




