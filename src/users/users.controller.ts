import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 201, description: 'Пользователь успешно создан' })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  @Post()
create(@Body() dto: CreateUserDto) {
  return this.usersService.create(dto);
}
  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, description: 'Список всех пользователей' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Получение задач пользователя' })
  @ApiResponse({ status: 200, description: 'Список задач пользователя' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  @Get(':id/tasks')
  findTasks(@Param('id') id: string) {
    return this.usersService.findWithTasks(id);
  }
  
  @ApiOperation({ summary: 'Получение пользователя по ID' })
  @ApiResponse({ status: 200, description: 'Пользователь найден' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
