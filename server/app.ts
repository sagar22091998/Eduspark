import express, { Request, Response, Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import { connectFunc } from './config/connect';

import profileRouter from './routes/profile.routes';
import instructorCoursesRouter from './routes/instructor_courses.routes';
import instructorVideosRouter from './routes/instructor_video.routes';
import instructorQuizRouter from './routes/instructor_quiz.routes';
import instructorQuestionRouter from './routes/instructor_question.routes';
import publicCoursesRouter from './routes/public_courses.routes';
import studentCoursesRouter from './routes/student_course.routes';
import studentQuizRouter from './routes/student_quiz.routes';

config();
const app: Express = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins: string[] = ['http://localhost:3000'];

app.use(
    cors({
        origin(origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg =
                    'The CORS policy for this site does not ' +
                    'allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        }
    })
);

app.get('/', (req: Request, res: Response) => {
    res.status(200).json('Welcome to Eduspark!');
});

app.use('/profile', profileRouter);
app.use('/instructor/course', instructorCoursesRouter);
app.use('/instructor/video', instructorVideosRouter);
app.use('/instructor/quiz', instructorQuizRouter);
app.use('/instructor/question', instructorQuestionRouter);
app.use('/course', publicCoursesRouter);
app.use('/student/course', studentCoursesRouter);
app.use('/student/quiz', studentQuizRouter);

connectFunc(process.env.NODE_ENV === 'production');

const port: number = parseInt(process.env.PORT!) || 3000;
const server = app.listen(port, () =>
    console.log(`Server started on port ${port}`)
);

export default server;
