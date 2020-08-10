import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { ObjectType, Field } from "type-graphql";

@Entity()
@ObjectType()
export class User {

    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column()
    @Field()
    firstName: string;

    @Column()
    @Field()
    lastName: string;

    @Column()
    @Field()
    age: number;

}
