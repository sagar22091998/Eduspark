import ICourse from './course.interface';
import IEnroll from './enroll.interface';
import IQuestion from './question.interface';
import IQuiz from './quiz.interface';
import IScore from './score.interface';
import IVideo from './video.interface';

export interface ICourseDetails {
    course: ICourse;
    studentsEnrolled: number;
}

export interface IProgressDetails {
    enroll: IEnroll;
    videos: IVideo[];
}

export interface IStartQuiz {
    quiz: IQuiz;
    questions: IQuestion[];
    timeLeft: number;
}

export interface IAnswers {
    questionNumber: number;
    option: number;
}

export interface IQuizList {
    quiz: IQuiz;
    score?: IScore;
}

export interface ILeaderboard {
    myScore: IScore;
    allScores: IScore[];
}

export interface IPaymentInitiate {
    id: string;
    currency: string;
    amount: number;
}
