import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async findAll(id: number) {
    return await this.categoryRepository.find({
      where: { user: { id } },
      relations: {
        transactions: true,
      },
    });
  }

  async findOne(id: number) {
    const existCategory = await this.categoryRepository.findOne({
      where: { id },
      relations: {
        user: true,
        transactions: true,
      },
    });
    if (!existCategory)
      throw new NotFoundException(ExceptionMessage.CATEGORY_NOT_EXISTS);
    return existCategory;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const existCategory = await this.categoryRepository.findOne({
      where: { id },
      relations: {
        user: true,
        transactions: true,
      },
    });
    if (!existCategory)
      throw new NotFoundException(ExceptionMessage.CATEGORY_NOT_EXISTS);
    return await this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: number): Promise<string> {
    const existCategory = await this.categoryRepository.findOne({
      where: { id },
      relations: {
        user: true,
        transactions: true,
      },
    });
    if (!existCategory)
      throw new NotFoundException(ExceptionMessage.CATEGORY_NOT_EXISTS);
    await this.categoryRepository.delete({ id: id });
    return `The category with #${id} was removed`;
  }
}
