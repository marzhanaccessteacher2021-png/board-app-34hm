import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskStatus } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateTaskDto) {
    return this.prismaService.task.create({ data: dto });
  }

  async findAll(status?: TaskStatus) {
    return this.prismaService.task.findMany({
      where: status ? { status } : {},
    });
  }

  async findWithUsers(id: string) {
    return this.prismaService.task.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  async findOne(id: string) {
    return this.prismaService.task.findUnique({
      where: { id },
    });
  }

  async remove(id: string) {
    return this.prismaService.task.delete({
      where: { id },
    });
  }
}
