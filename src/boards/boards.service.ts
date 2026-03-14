
import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryBoardDto } from './dto/query-board.dto';

@Injectable()
export class BoardsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateBoardDto) {
    return await this.prisma.board.create({ data: dto });
  }

  async findAll(query: QueryBoardDto) {
    const {
      page = 1,
      limit = 10,
      title,
      sortBy = 'createdAt',
      order = 'desc',
    } = query;

    // Build the WHERE clause dynamically
    const where: any = {};
    if (title) where.title = { contains: title, mode: 'insensitive' };

    const skip = (page - 1) * limit; // e.g. page 2, limit 10 → skip 10

    // Run data query AND count query at the same time (parallel = faster)
    const [boards, total] = await Promise.all([
      this.prisma.board.findMany({
        where,
        orderBy: { [sortBy]: order },
        skip,
        take: limit,
        include: {
          _count: { select: { tasks: true } }, // adds reviewsCount
        },
      }),
      this.prisma.board.count({ where }),
    ]);

    return {
      data: boards,
      meta: {
        total,              // total matching records
        page,               // current page
        limit,              // items per page
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    };
  }

  async findOne(id: number) {
    return await this.prisma.board.findUnique({ where: { id } });
  }

  

  async update(id: number, dto: UpdateBoardDto) {
    return await this.prisma.board.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    return await this.prisma.board.delete({ where: { id } });
  }
}