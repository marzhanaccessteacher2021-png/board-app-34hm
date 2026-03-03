import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateUserDto) {
  return await this.prismaService.user.create({
    data: dto,
  });
}
  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findWithTasks(id: string) {
    return await this.prismaService.user.findUnique({
      where: { id },
      include: { tasks: true },
    });
  }

  async findOne(id: string) {
    return await this.prismaService.user.findUnique({
      where: { id },
    });
  }


  async remove(id: string) {
    return await this.prismaService.user.delete({
      where: { id },
    });
  }
}
