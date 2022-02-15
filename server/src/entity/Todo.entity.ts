import { Entity, ObjectIdColumn, ObjectID, Column, Generated } from "typeorm";

@Entity()
export class Todo {

  @ObjectIdColumn()
  _id: ObjectID;

  @Generated("uuid")
  id: string;

  @Column()
  todo: string;

  @Column()
  status: boolean;

  @Column()
  userName: string;

}
