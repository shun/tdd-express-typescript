import request from "supertest";
import { AppServer } from "../src/server";
import { User } from "../src/entity/User";
import { getRepository, getConnection, createConnection } from "typeorm";
import DBConfig from "../ormconfig";

type UserResponseBody = {
  lastName: string,
  firstName: string,
  age: number
};

let conn;
beforeAll(async () => {
  conn = await createConnection(
    DBConfig
  );
});

afterEach(async () => {
});

afterAll(async() => {
  conn.close();
});

describe("UserResolver", () => {

  let server: AppServer;
  let user: User;
  beforeEach(async() => {
    server = new AppServer();
    server.setup();

    user = await getRepository(User).create({
      firstName: "shunsuke",
      lastName: "kudo",
      age: 42
    });
    await getRepository(User).save(user);
  });

  afterEach(async() => {
    await getRepository(User).clear();
  });

  describe("return 200", () => {
    it("id:1 user", async () => {
      const result = request(server.app)
              .post("/graphql")
              .send({
                query: `{
                  user(id: 1) {
                    lastName
                    firstName
                    age
                  }
                }`
              })
              .expect(200)
              .then((res) => {
                const actual: UserResponseBody = res.body.data.user;
                expect(user.firstName).toBe(actual.firstName);
                expect(user.lastName).toBe(actual.lastName);
                expect(user.age).toBe(actual.age);
              });

      return result;
    });
  });
});
