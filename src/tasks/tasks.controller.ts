import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from '@prisma/client';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Создание задачи' })
  @ApiResponse({ status: 201, description: 'Задача успешно создана' })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }

  @ApiOperation({ summary: 'Получение всех задач' })
  @ApiResponse({ status: 200, description: 'Список всех задач' })
  @Get()
  findAll(@Query('status') status?: TaskStatus) {
    return this.tasksService.findAll(status);
  }

  @ApiOperation({ summary: 'Получение пользователей задачи' })
  @ApiResponse({ status: 200, description: 'Список пользователей задачи' })
  @ApiResponse({ status: 404, description: 'Задача не найдена' })
  @Get(':id/users')
  findUsers(@Param('id') id: string) {
    return this.tasksService.findWithUsers(id);
  }

  @ApiOperation({ summary: 'Получение задачи по ID' })
  @ApiResponse({ status: 200, description: 'Задача найдена' })
  @ApiResponse({ status: 404, description: 'Задача не найдена' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @ApiOperation({ summary: 'Удаление задачи по ID' })
  @ApiResponse({ status: 200, description: 'Задача успешно удалена' })
  @ApiResponse({ status: 404, description: 'Задача не найдена' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
