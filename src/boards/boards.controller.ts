import { Controller, Get, Post, Body, Param, Delete} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Boards')
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}
  @ApiOperation({summary: 'Создание доски'})
  @ApiResponse({status: 201, description: 'Доска успешно создана'})
  @Post()
  create(@Body() dto: CreateBoardDto) {
    return this.boardsService.create(dto);
  }

  @ApiOperation({summary: 'Получение всех досок'})
  @ApiResponse({status: 200, description: 'Список всех досок'})
  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @ApiOperation({summary: 'Получение задач по доске'})
  @ApiResponse({status: 200, description: 'Список задач по доске'})
  @Get(':id/tasks')
  findTasks(@Param('id') id: number) {
    return this.boardsService.findOneWithTasks(+id);
  }

  @ApiOperation({summary: 'Получение доски по ID'})
  @ApiResponse({status: 200, description: 'Доска найдена'})
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.boardsService.findOne(+id);
  }

  @ApiOperation({summary: 'Удаление доски по ID'})
  @ApiResponse({status: 200, description: 'Доска успешно удалена'})
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.boardsService.remove(+id);
  }
}
