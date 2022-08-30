
import { Router } from "express";
import { TestController } from "../controllers/TestController";
import { handleTestService } from "../services/handleTestService";
const testRoutes = Router();
let testController = new TestController(new handleTestService());
testRoutes.get('/', testController.getPracticeQuestions);
testRoutes.post('/submit', testController.getRank);

export default testRoutes;