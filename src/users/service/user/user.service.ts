import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from 'src/DTO/user.dto';
import { User } from 'src/entities/user';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(userData: UserDTO) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
    console.log('Service: ', userData);
    return await this.userRepository.save(newUser).catch((error) => {
      console.log('Error saving user', error);
    });
  }

  async findUserByUsername(username: string) {
    return await this.userRepository.findOne({ where: { username } });
  }

  async comparePasswords(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
}
