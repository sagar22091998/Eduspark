import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';
import { connectFunc } from './config/connect';

config();
const app = express();

app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
    res.status(200).json('Welcome to Eduspark!');
});

connectFunc(process.env.ENV === 'production');

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
    console.log(`Server started on port ${port}`)
);

export default server;
