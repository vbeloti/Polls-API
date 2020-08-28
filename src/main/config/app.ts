import express from 'express';
import setupMiddlerares from './middlewares';

const app = express();
setupMiddlerares(app);

export default app;
