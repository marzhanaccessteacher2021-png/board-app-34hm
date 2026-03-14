import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { User } from 'src/generated/prisma/client';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // ---------------- CREATE TASK ----------------
  @ApiOperation({ summary: 'Create task' })
  @ApiResponse({ status: 201, description: 'Task is successfully created.' })
  @Authorization()
  @Post()
  create(
    @Body() dto: CreateTaskDto,
    @Authorized('id') userId: string, // id из JWT
  ) {
    return this.tasksService.create(dto, userId);
  }

  // ---------------- GET ALL TASKS ----------------
  @ApiOperation({ summary: 'Get all tasks' })
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  // ---------------- GET TASK BY ID ----------------
  @ApiOperation({ summary: 'Get task by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  // ---------------- UPDATE TASK ----------------
  @ApiOperation({ summary: 'Patch your task' })
  @ApiResponse({
    status: 403,
    description: 'You can only update your own task.',
  })
  @Authorization()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
    @Authorized('id') userId: string, // id из JWT
  ) {
    return this.tasksService.update(id, dto, userId);
  }

  // ---------------- DELETE TASK ----------------
  @ApiOperation({ summary: 'Delete your task' })
  @ApiResponse({
    status: 403,
    description: 'You can only delete your own task.',
  })
  @Authorization()
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Authorized('id') userId: string,   // id из JWT
    @Authorized('role') userRole: Role // роль из JWT
  ) {
    return this.tasksService.remove(id, userId, userRole);
  }
}