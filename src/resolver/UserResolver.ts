import { Resolver, Mutation, Int, Arg, Query } from "type-graphql";
import { getRepository, getConnection, createConnection } from "typeorm";
import { User } from "../entity/User";

@Resolver()
export class UserResolver {
  //---------------------------------------------
  // Query
  //
  @Query(() => User)
  async user(
    @Arg("id") id: number
  ): Promise<User> {
    const user = await getRepository(User).findOne({
      where: {id: id}
    })

    return user;
  }

  //---------------------------------------------
  // Mutation
  //

  //---------------------------------------------
  // Function
  //
}
