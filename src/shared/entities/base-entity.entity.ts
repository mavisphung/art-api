import { Column, CreateDateColumn, Entity, Generated, UpdateDateColumn } from "typeorm";

export abstract class BaseModel {

  @Column({ unique: true })
  uuid: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)'
  })
  updatedAt: Date;

  @Column({
    name: 'is_deleted',
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