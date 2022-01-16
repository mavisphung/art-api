import { BaseModel } from "src/shared/entities/base-entity.entity";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseModel {
  
  @PrimaryColumn({generated: "identity"})
  id: number;

  @Column({
    unique: true
  })
  email: string;
  
  @Column()
  password: string;

  @Column()
  isActive: boolean;

}
