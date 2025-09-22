import express, { Request, Response, NextFunction } from "express";
import configuration from "./config";
import { Routes } from "./interface/routes.interface";
import { MongoDB } from "./database/database";
import {routes} from '../src/routes/index'

export default class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }

  public async initializeDatabase() {
    await MongoDB.connect();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.map((route) => {
      this.app.use("/api/v1", route.router);
    });

    this.app.get("/", (_, res: Response) => {
      return res.send("Welcome to Content Aggregator API 🚀");
    });

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).json({
        message: "Route not found",
      });
    });


  }

  public startServer() {
    this.app.listen(configuration.port, () => {
      console.log("=================================");
       console.log(`🚀 App listening on the port ${configuration.port}`);
       console.log("=================================");
    });
  }
}


