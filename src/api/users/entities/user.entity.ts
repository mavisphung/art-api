import { Exclude } from "class-transformer";
import { BaseModel } from "src/shared/entities/base-entity.entity";
import { Role } from "src/shared/roles/role.enum";
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
  _id: ObjectID;

  @PrimaryGeneratedColumn('increment')
  id: number;

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

  @Column()
  roles: Role[];
}

export interface IUser {
  _id?: string;
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
