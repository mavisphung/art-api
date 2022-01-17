import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './entities/user.entity';
import { ObjectID } from 'typeorm';
import { Utils } from 'src/shared/shared.util';
import { JwtAuthGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { AllowedRoles } from 'src/shared/roles/role.decorator';
import { Role } from 'src/shared/roles/role.enum';

@Controller('users')
@UseGuards(JwtAuthGuard)
// @AllowedRoles(Role.USER)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @AllowedRoles(Role.ADMIN)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  // @AllowedRoles(Role.USER)
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    const usersFormatList = Utils.formatUserResponseList(users);
    return usersFormatList; 
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request) {
    const found = await this.usersService.findOne(id);
    const result = Utils.formatUserResponse(found);
    console.log(req.user);
    return result;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
