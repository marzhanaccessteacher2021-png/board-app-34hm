import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BoardsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(dto: CreateBoardDto) {
    return await this.prismaService.board.create({ data: dto });
  }

  async findAll() {
    return await this.prismaService.board.findMany();
  }

    async findOneWithTasks(id: number) {
      return await this.prismaService.board.findUnique({
        where: { id },
        select: { 
          id: true,
          title: true,
          createdAt: true,

          tasks: {
            select: {
              id: true,
              title: true,
              status: true,
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
          },
        },
      });
  }

  async findOne(id: number) {
    return await this.prismaService.board.findUnique({ where: { id } });
  }

  async remove(id: number) {
    return await this.prismaService.board.delete({ where: { id } });
  }
}
