import request from "supertest";
import { AppServer } from "../src/server";

let server: AppServer;

beforeAll(async () => {
  server = new AppServer();
  await server.setup();

});

afterAll(async () => {
});

describe("GET /", () => {
  it("return 200 and correct message", async () => {
    return request(server.app)
            .get("/")
            .expect(200)
            .expect({message: "AppServer started"});
  });
});
