import { Injectable } from '@nestjs/common';
import { Role } from 'src/enums/role.enum';
import { UserDTO } from 'src/UserDTO/user.dto';

@Injectable()
export class UserService {
  private users = [
    {
      id: 1,
      apiKey: 'userA101',
      name: 'UserA',
      email: 'userA@example.com',
      roles: [Role.ADMIN],
      password: 'secretKey1',
    },
    {
      id: 2,
      apiKey: 'userB102',
      name: 'UserB',
      email: 'userB@example.com',
      roles: [Role.USER],
      password: 'secretKey2',
    },
    {
      id: 3,
      apiKey: 'userC103',
      name: 'UserC',
      email: 'userC@example.com',
      roles: [Role.USER],
      password: 'secretKey3',
    },
  ];

  createUser(user: any): void {
    this.users.push(user);
  }

  getUser(apiKey: string) {
    return this.users.find((user) => user.apiKey === apiKey);
  }

  getAllUsers() {
    return this.users;
  }

  findUser(id: number) {
    return this.users.find((user) => user.id === id);
  }
}
