import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  email: string;
}
