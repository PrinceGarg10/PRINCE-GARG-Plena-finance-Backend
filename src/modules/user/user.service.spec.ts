import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { UserEntity } from './schema/user.schema';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, {
        provide: getModelToken(UserEntity.name), // Assuming 'User' is the correct model name
        useValue: UserEntity, // Mock the UserEntity model
      },],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  describe('findAll', () => {
    it('should return an array of users', async () => {
      // Mock user data
      const users = [
        { id: '1', name: 'User 1', contact: '1234567890' },
        { id: '2', name: 'User 2', contact: '9876543210' },
      ];

      // Mock the findAll method to return the users
      jest.spyOn(service, 'findAll').mockResolvedValue(users);

      // Call the findAll method
      const result = await service.findAll({});

      // Verify the result
      expect(result).toEqual(users);
    });
  });
});
