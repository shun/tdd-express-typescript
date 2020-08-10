import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cors from "cors";

export class AppServer {
  public app: any;
  private server: ApolloServer;
  private connection;

  constructor() {
    this.app = express();

  }

  public async setup(): Promise<void> {
    try {
      const schema = await buildSchema({
        resolvers: [__dirname + "/resolver/**/*.ts"],
      });
      this.server = new ApolloServer({
        schema,
        playground: true,
      });

      this.server.applyMiddleware({ app: this.app });

      this.setupRoutes();

    } catch (err) {
      console.log(err);

    }
  }

  private setupRoutes(): void {
    this.app.get("/", (req, res) => {
      res.json({ message: "AppServer started" });
    });
  }

  public start(): void {
    this.app.listen( {port: 4000}, () => {
      console.log(`server on http://localhost:4000${this.server.graphqlPath}`);
    });
  }
}
