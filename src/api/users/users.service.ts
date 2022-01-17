import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuid } from 'uuid';
import { Utils } from 'src/shared/shared.util';
import { AppError, ERROR_CODE } from 'src/shared/error';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/shared/roles/role.enum';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly repo: MongoRepository<User>
  ) {}

  private async isExistedUser(email: string): Promise<boolean> {
    let found = null;
    try {
      found = await this.repo.findOne({
        where: { email: email }
      });
    } catch (err) {
      console.log(err);
    }
    return found ? true : false;
  }

  async create(createUserDto: CreateUserDto) {
    const isExistedEmail = await this.isExistedUser(createUserDto.email);
    if (isExistedEmail) {
      throw new AppError(ERROR_CODE.USER_EXISTED, 'Existed other user using this email');
    }

    const user = new User(
      createUserDto.email,
      createUserDto.firstName,
      createUserDto.lastName,
      createUserDto.phoneNumber
    );
    user.uuid = uuid();
    user.isDeleted = false;
    user.isActive = true;
    user.roles = [Role.USER];
    try {
      user.password = await Utils.hash(createUserDto.password, 10);
    } catch (err) {
      console.log('Error at create service: ' + err);
    }
    return this.repo.save(user);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const found = await this.repo.findOne(id);
    if (!found) {
      throw new AppError(ERROR_CODE.USER_NOT_FOUND, 'Not found user with id ' + id.toString());
    }
    return found;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  findOneByEmail(email: string) {
    return this.repo.findOne({ email });
  }

  async validatePassword(plain: string, hashed: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plain, hashed, (err, same) => {
        if (err) return new AppError(ERROR_CODE.INVALID_PASSWORD);

        return resolve(same);
      });
    });
  }
}
