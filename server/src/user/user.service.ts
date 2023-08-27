import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    console.log('exist', existUser);
    if (existUser)
      throw new BadRequestException(`User ${dto.email} already exists`);
    const user = await this.userRepository.save({
      email: dto.email,
      password: await argon2.hash(dto.password),
    });
    return user;
  }

  async findOne(email: string) {
    const existUser = await this.userRepository.findOne({
      where: { email },
    });
    return existUser;
  }

  async deleteUser(email: string): Promise<string> {
    await this.userRepository.delete({ email: email });
    return `user with email  ${email} was deleted`;
  }
}
