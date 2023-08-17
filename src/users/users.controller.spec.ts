import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const UserEntityList: UserEntity[] = [
  new UserEntity({
    codigo: 1,
    firstName: 'Teste1',
    lastName: 'da Silva',
    email: 'teste1@gmail.com',
  }),
  new UserEntity({
    codigo: 2,
    firstName: 'Teste2',
    lastName: 'da Rocha',
    email: 'teste2@gmail.com',
  }),
  new UserEntity({
    codigo: 3,
    firstName: 'Teste3',
    lastName: 'da Cunha',
    email: 'teste3@gmail.com',
  }),
];

const newUserEntity = new UserEntity({
  firstName: 'Teste',
  lastName: 'da Silva',
  email: 'teste@gmail.com',
});

const updatedUserEntity = new UserEntity({
  firstName: 'Teste-1',
  lastName: 'da Silva Ferreira',
  email: 'teste-teste@gmail.com',
});

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            paginate: jest.fn(),
            create: jest.fn().mockResolvedValue(newUserEntity),
            findAll: jest.fn().mockResolvedValue(UserEntityList),
            findOne: jest.fn().mockResolvedValue(UserEntityList[0]),
            update: jest.fn().mockResolvedValue(updatedUserEntity),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a users list entity successfully', async () => {
      const result = await usersController.findAll();

      expect(result).toEqual(UserEntityList);
      expect(typeof result).toEqual('object');
    });

    it('should thorw an exception', () => {
      jest.spyOn(usersController, 'findAll').mockRejectedValueOnce(new Error());

      expect(usersController.findAll()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const body: CreateUserDto = {
        firstName: 'Teste',
        lastName: 'da Silva',
        email: 'teste@gmail.com',
      };

      const result = await usersController.create(body);

      expect(result).toEqual(newUserEntity);
    });

    it('should thorw an exception', () => {
      const body: CreateUserDto = {
        firstName: 'Teste',
        lastName: 'da Silva',
        email: 'teste@gmail.com',
      };

      jest.spyOn(usersController, 'create').mockRejectedValueOnce(new Error());

      expect(usersController.create(body)).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return one user', async () => {
      const result = await usersController.findOne('1');

      expect(result).toEqual(UserEntityList[0]);
    });

    it('should thorw an exception', () => {
      jest.spyOn(usersController, 'findOne').mockRejectedValueOnce(new Error());

      expect(usersController.findOne('1')).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const body: UpdateUserDto = {
        firstName: 'Teste-1',
        lastName: 'da Silva Ferreira',
        email: 'teste-teste@gmail.com',
      };

      const result = await usersController.update('1', body);

      expect(result).toEqual(updatedUserEntity);
    });

    it('should thorw an exception', () => {
      const body: UpdateUserDto = {
        firstName: 'Teste-1',
        lastName: 'da Silva Ferreira',
        email: 'teste-teste@gmail.com',
      };

      jest.spyOn(usersController, 'update').mockRejectedValueOnce(new Error());

      expect(usersController.update('1', body)).rejects.toThrowError();
    });
  });

  describe('delete', () => {
    it('should remove a user successfully', async () => {
      const result = await usersController.remove('1');

      expect(result).toBeUndefined();
    });

    it('should thorw an exception', () => {
      jest.spyOn(usersController, 'remove').mockRejectedValueOnce(new Error());

      expect(usersController.remove('1')).rejects.toThrowError();
    });
  });
});
