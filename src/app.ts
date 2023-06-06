import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
// getting-started.js
// const mongoose = require('mongoose');
