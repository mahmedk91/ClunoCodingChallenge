import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import OfferRouter from "./routes/OfferRouter";

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(cors());
  }

  private routes(): void {
    this.express.use("/offers", OfferRouter);
  }
}

export default new App().express;
