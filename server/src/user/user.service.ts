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
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const existUser = await this.usersRepository.findOne({
      where: { email: dto.email },
    });
    console.log('exist', existUser);
    if (existUser)
      throw new BadRequestException(`User ${dto.email} already exists`);
    const user = await this.usersRepository.save({
      email: dto.email,
      password: await argon2.hash(dto.password),
    });
    return user;
  }

  async findOne(id: number) {
    const existUser = await this.usersRepository.findOne({
      where: { id },
    });
    if (!existUser)
      throw new BadRequestException(`User with id ${id} does not exists`);
    return existUser;
  }
}
