import { Usuario } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements Usuario {
  @ApiProperty()
  codigo: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt: Date;
}
