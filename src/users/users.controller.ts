import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiQuery({ name: 'skip', type: Number })
  @ApiQuery({ name: 'take', type: Number })
  @Get('pages')
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async pagination(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('take', ParseIntPipe) take: number,
  ) {
    try {
      const users = await this.usersService.paginate(skip, take);
      return users;
    } catch (e) {
      throw new NotFoundException(e);
    }
  }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':codigo')
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('codigo', ParseIntPipe) id: string) {
    const user = await this.usersService.findOne(+id);

    if (!user) {
      throw new NotFoundException(`Não foi possivel achar este usuário.`);
    }

    return user;
  }

  @Patch(':codigo')
  @ApiOkResponse({ type: UserEntity })
  update(
    @Param('codigo', ParseIntPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':codigo')
  @ApiOkResponse({ type: UserEntity })
  remove(@Param('codigo', ParseIntPipe) id: string) {
    return this.usersService.remove(+id);
  }
}
