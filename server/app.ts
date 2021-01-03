import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import { connectFunc } from './config/connect';
import profileRouter from './routes/profile.routes';

config();
const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.status(200).json('Welcome to Eduspark!');
});

app.use('/profile', profileRouter);

connectFunc(process.env.NODE_ENV === 'production');

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
    console.log(`Server started on port ${port}`)
);

export default server;
