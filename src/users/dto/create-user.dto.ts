import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Email пользователя', example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Имя пользователя', example: 'John Doe' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ description: 'Пароль пользователя', example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;
}
