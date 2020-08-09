import express from "express";

export class AppServer {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setupRoutes();
  }

  public setupRoutes() {
    this.app.get("/", (req, res) => {
      res.json({ message: "AppServer started" });
    });
  }

  public start() {
    this.app.listen( {port: 4000}, () => {
      console.log(`server on http://localhost:4000`);
    });
  }
}
