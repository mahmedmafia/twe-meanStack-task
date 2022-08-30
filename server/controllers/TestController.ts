import { NextFunction, Request, Response } from "express";
import { DataHelper } from "../helpers/DataHelper";
import { ITestService } from "../interfaces/ITestService";

export class TestController {
    dataJSonHelper = new DataHelper();
    testServ
    constructor(testService: ITestService) {
        this.testServ = testService;
    }
    getPracticeQuestions = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.testServ.getPracticeQuestions();
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }

    }
    getRank = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const score=req.body.score;
            const result=await this.testServ.getRank(score);
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }

}