import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionMessage } from 'src/common/enums/enums';
import { ResponseCategoryDto } from './dto/response-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
    user: { email: string; password: string; id: string },
  ) {
    const existUser = await this.categoryRepository.findBy({
      user: { email: user.email },
      title: createCategoryDto.title,
    });

    if (existUser.length)
      throw new BadRequestException(ExceptionMessage.TITLE_ALREADY_EXISTS);
    const newCategory = {
      title: createCategoryDto.title,
      user: {
        id: +user.id,
      },
    };
    await this.categoryRepository.save(newCategory);
    return newCategory;
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async remove(id: number): Promise<string> {
    await this.categoryRepository.delete({ id: id });
    return `The category with #${id} was removed`;
  }
}
