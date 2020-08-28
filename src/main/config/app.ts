import express from 'express';
import setupMiddlerares from './middlewares';
import setupRoutes from './routes';

const app = express();
setupMiddlerares(app);
setupRoutes(app);
export default app;
