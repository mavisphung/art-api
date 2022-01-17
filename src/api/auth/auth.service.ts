import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppError, ERROR_CODE } from 'src/shared/error';
import { Utils } from 'src/shared/shared.util';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

  constructor(private userService: UsersService,
              private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email);
    const compareResult = await this.userService.validatePassword(pass, user.password);
    // const user: any = {};
    if (!user || !compareResult) {
      throw new AppError(ERROR_CODE.UNAUTHORIZED);
    }

    // await this.userService.validatePassword(pass, user.password);
    // const compareResult = await compare(pass, user.password);
    // const { password, ...result } = user;
    return user as User;
  }

  async login(user: any) {
    console.log('login service invoked...');
    const validatedUser = await this.validateUser(user.email, user.password);
    const payload = {
      email: validatedUser.email,
      sub: validatedUser._id,
      roles: validatedUser.roles ? validatedUser.roles : ['']
    }
    return {
      accessToken: this.jwtService.sign(payload),
      info: Utils.formatUserResponse(validatedUser)
    }
  }
}
