import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuid } from 'uuid';
import { Utils } from 'src/shared/shared.util';
import { AppError, ERROR_CODE } from 'src/shared/error';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly repo: MongoRepository<User>
  ) {}

  private async isExistedUser(email: string): Promise<boolean> {
    const found = await this.repo.findOne({ email: email });
    return found ? true : false;
  }

  async create(createUserDto: CreateUserDto) {
    const isExistedEmail = this.isExistedUser(createUserDto.email);
    if (isExistedEmail) {
      throw new AppError(ERROR_CODE.USER_EXISTED, 'Duplicated email');
    }

    
    let user = new User();
    user.email = createUserDto.email;
    user.uuid = uuid();
    try {
      user.password = await Utils.hash(createUserDto.password, 10);
    } catch (err) {
      console.log('Error at create service: ' + err);
    }
    return this.repo.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
