import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateBoardDto {
    @ApiProperty({description: 'Название доски', example: 'Моя доска'})
    @IsString()
    title: string;
}
