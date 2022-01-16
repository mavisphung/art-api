import { Column, CreateDateColumn, Generated, UpdateDateColumn } from "typeorm";

export abstract class BaseModel {

  @Column()
  @Generated('uuid')
  uuid: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)'
  })
  updatedAt: Date;

  @Column({
    type: 'boolean',
    default: () => false
  })
  isDeleted: boolean;

  public delete() {
    this.isDeleted = true;
  }

  public restore() {
    this.isDeleted = false;
  }
}