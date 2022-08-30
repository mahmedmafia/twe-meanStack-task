import  {TestQuestions} from './Data';
export interface ITestService{
    getPracticeQuestions():Promise<TestQuestions>;
    getRank(score:number):Promise<number>;
}