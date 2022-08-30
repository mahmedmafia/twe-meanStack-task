import { Router } from "express";
import testRoutes from "./testRoutes";
 const appRoutes = Router();
appRoutes.use('/test',testRoutes);

export default appRoutes;