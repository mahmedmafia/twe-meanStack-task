import express, { Request, Response } from "express";
import cors from "cors";
import  allRoutes  from "./routes";
import { errorHandleMiddleWare } from "./middlewares/errorHandleMiddleWare";
export class App {
    public app: express.Application;
     PORT=process.env.PORT || 3000;

    constructor() {
      this.app = express();
      this.addMiddleWares();
    }
    addMiddleWares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(cors());
        this.app.use(allRoutes);
        this.app.use(errorHandleMiddleWare);
    }
    public listen(){
        this.app.listen(this.PORT,()=>{
            console.log(`'app running on port:${this.PORT}`);
        })
    }

}

new App().listen();