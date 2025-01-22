import { Injectable } from '@nestjs/common';
import { Role } from 'src/enums/role.enum';
import { UserDTO } from 'src/UserDTO/user.dto';

@Injectable()
export class UserService {
  private users = [
    {
      apiKey: 'userA101',
      name: 'UserA',
      email: 'userA@example.com',
      roles: [Role.ADMIN],
    },
    {
      apiKey: 'userB102',
      name: 'UserB',
      email: 'userB@example.com',
      roles: [Role.USER],
    },
    {
      apiKey: 'userC103',
      name: 'UserC',
      email: 'userC@example.com',
      roles: [Role.USER],
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
}
