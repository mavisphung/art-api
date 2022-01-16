import { UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { IUser, User } from "src/api/users/entities/user.entity";


export class Utils {

  static async hash(plain: string, salt: string | number): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(plain, salt, (err, hashed) => {
        if (err) return reject(err);
        return resolve(hashed);
      })
    })
  }

  static checkPassword(hashed: string, plain: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plain, hashed, (err, isMatch) => {
        if (err) return new UnauthorizedException();
        return resolve(isMatch);
      })
    })
  }

  static formatUserResponseList(users: User[]): IUser[] {
    const formattedList = users.map(user => {
      return {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        isActive: user.isActive,
        isDeleted: user.isDeleted,
        phoneNumber: user.phoneNumber
      }
    });
    return formattedList;
  }

  static formatUserResponse(user: User): IUser {
    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      isActive: user.isActive,
      isDeleted: user.isDeleted,
      phoneNumber: user.phoneNumber
    }
  }
}