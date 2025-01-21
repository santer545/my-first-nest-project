import { Injectable } from '@nestjs/common';
import { UserDTO } from 'src/UserDTO/user.dto';

@Injectable()
export class UserService {
  private users: UserDTO[] = [];

  createUser(user: UserDTO): void {
    this.users.push(user);
  }

  getAllUsers(): UserDTO[] {
    return this.users;
  }
}
