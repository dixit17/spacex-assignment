import express from 'express';
import cors from 'cors';
import launchesRouter from './routes/launchRoutes';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/launches', launchesRouter);


export default app;
