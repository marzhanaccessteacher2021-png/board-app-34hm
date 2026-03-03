import { IsEnum, IsInt, IsString } from "class-validator";
import { TaskStatus} from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
    @ApiProperty({description: 'Название задачи', example: 'Моя задача'})
    @IsString()
    title: string;

    @ApiProperty({description: 'Описание задачи', example: 'Описание моей задачи'})
    @IsString()
    description: string;

    @ApiProperty({description: 'Статус задачи', example: 'TODO'})
    @IsEnum(TaskStatus)
    status: TaskStatus;

    @ApiProperty({description: 'ID доски', example: 1})
    @IsInt()
    boardId: number;

    @ApiProperty({description: 'ID пользователя', example: 'user-id'})
    @IsString()
    userId: string;
}
