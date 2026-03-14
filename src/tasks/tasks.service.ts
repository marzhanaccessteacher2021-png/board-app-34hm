import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  // ---------------- CREATE TASK ----------------
  async create(dto: CreateTaskDto, userId: string) {
    return await this.prisma.task.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  // ---------------- GET ALL TASKS ----------------
  async findAll() {
    return await this.prisma.task.findMany({
      include: {
        user: { select: { id: true, name: true } },
        board: { select: { id: true, title: true } },
      },
    });
  }

  // ---------------- GET TASK BY ID ----------------
  async findOne(id: string) {
    return await this.prisma.task.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true } },
        board: { select: { id: true, title: true } },
      },
    });
  }

  // ---------------- GET TASKS BY BOARD ----------------
  async findByBoardId(boardId: number) {
    return await this.prisma.task.findMany({
      where: { boardId },
      include: {
        user: { select: { id: true, name: true } },
        board: { select: { id: true, title: true } },
      },
    });
  }

  // ---------------- UPDATE TASK ----------------
  async update(id: string, dto: UpdateTaskDto, userId: string) {
    const task = await this.prisma.task.findUnique({ where: { id } });

    if (!task) throw new NotFoundException('Task not found');

    // Only the owner can edit their task
    if (task.userId !== userId) {
      throw new ForbiddenException('You can only edit your own task');
    }

    return await this.prisma.task.update({ where: { id }, data: dto });
  }

  // ---------------- DELETE TASK ----------------
  async remove(id: string, userId: string, userRole: Role) {
    const task = await this.prisma.task.findUnique({ where: { id } });

    if (!task) throw new NotFoundException('Task not found');

    // Admins can delete any task; regular users only their own
    if (userRole !== Role.ADMIN && task.userId !== userId) {
      throw new ForbiddenException('You can only delete your own task');
    }

    return await this.prisma.task.delete({ where: { id } });
  }
}