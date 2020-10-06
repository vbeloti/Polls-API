import express from 'express';
import setupMiddlerares from './middlewares';
import setupSwagger from './config-swagger';
import setupRoutes from './routes';

const app = express();
setupSwagger(app);
setupMiddlerares(app);
setupRoutes(app);
export default app;
