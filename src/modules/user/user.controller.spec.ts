import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './schema/user.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [UserService, {
        provide: getModelToken(UserEntity.name), // Assuming 'User' is the correct model name
        useValue: UserEntity, // Mock the UserEntity model
      },],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: any = {
        name: 'Test User',
        contact: "9999999999",
        dob: new Date("2000-01-01")
      };

      jest.spyOn(userService, 'create').mockResolvedValueOnce(createUserDto);

      const result = await controller.create(createUserDto);

      expect(result).toEqual(createUserDto);
    });
  });

  // Add more test cases for other controller methods as needed
});
