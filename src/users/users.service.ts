import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async paginate(skip: number, take: number) {
    const [users, total] = await this.prisma.$transaction([
      this.prisma.usuario.findMany({
        skip,
        take,
      }),
      this.prisma.usuario.count(),
    ]);

    const totalPage = Math.ceil(total / take);

    return { total, totalPage, users };
  }
  create(createUserDto: CreateUserDto) {
    return this.prisma.usuario.create({ data: createUserDto });
  }

  findAll() {
    return this.prisma.usuario.findMany({});
  }

  findOne(codigo: number) {
    return this.prisma.usuario.findUnique({ where: { codigo } });
  }

  update(codigo: number, updateUserDto: UpdateUserDto) {
    return this.prisma.usuario.update({
      where: { codigo },
      data: updateUserDto,
    });
  }

  remove(codigo: number) {
    return this.prisma.usuario.delete({ where: { codigo } });
  }
}
