// src/users/users.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ---------------- CREATE USER ----------------

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 201, description: 'Пользователь успешно создан' })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  // ---------------- GET ALL USERS ----------------

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, description: 'Список всех пользователей' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // ⭐ BONUS: CURRENT USER PROFILE

  @ApiOperation({ summary: 'Профиль текущего пользователя' })
  @ApiResponse({ status: 200, description: 'Текущий пользователь' })
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@Request() req) {
    return this.usersService.findMe(req.user.id);
  }

  // ---------------- USER TASKS ----------------

  @ApiOperation({ summary: 'Получение задач пользователя' })
  @ApiResponse({ status: 200, description: 'Список задач пользователя' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  @Get(':id/tasks')
  findTasks(@Param('id') id: string) {
    return this.usersService.findWithTasks(id);
  }

  // ---------------- GET USER BY ID ----------------

  @ApiOperation({ summary: 'Получение пользователя по ID' })
  @ApiResponse({ status: 200, description: 'Пользователь найден' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // ---------------- DELETE USER ----------------

  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь удалён' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}