import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Public } from 'src/shared/public.decorator';
import { AuthService } from './auth.service';
import { LoginPayload } from './dto/auth.dto';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() payload: LoginPayload, @Res() res: Response) {
    console.log('login controller method invoked...')
    const token = await this.authService.login(payload);
    return res.status(HttpStatus.CREATED).send(token);
  }
}
