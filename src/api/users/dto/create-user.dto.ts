import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 32)
  password: string;

  @IsNotEmpty()
  password2: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  phoneNumber: string;
}
