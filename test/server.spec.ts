import request from "supertest";
import { AppServer } from "../src/server";

describe("GET /", () => {
  it("return 200 and correct message", () => {
    const server = new AppServer();

    return request(server.app)
            .get("/")
            .expect(200)
            .expect({message: "AppServer started"});
  });
});
