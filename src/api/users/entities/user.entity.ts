import { Exclude } from "class-transformer";
import { BaseModel } from "src/shared/entities/base-entity.entity";
import { Column, Entity, ObjectID, ObjectIdColumn, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseModel {
  
  constructor(email: string, firstName: string, lastName: string, phoneNumber: string, password?: string) {
    super();
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
  }

  // @PrimaryColumn({generated: "increment"})
  // id: number;

  @ObjectIdColumn()
  id: ObjectID;

  @Column({
    unique: true
  })
  email: string;
  
  @Column({
    select: false
  })
  password: string;

  @Column()
  isActive: boolean;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phoneNumber: string;
}

export interface IUser {
  id?: string;
  uuid?: string;
  email: string;
  isActive: boolean;
  isDeleted: boolean;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
}
