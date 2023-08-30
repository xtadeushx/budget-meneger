import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiPath, HttpCode } from 'src/common/enums/enums';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseCategoryDto } from './response/crate-category.dto';
import { Category } from './entities/category.entity';
import { RemoveCategoryDto } from './response/remove-category.dto';

@Controller(ApiPath.CATEGORY)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiTags('API')
  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @ApiResponse({
    status: HttpCode.CREATED,
    type: ResponseCategoryDto,
  })
  create(@Body() createCategoryDto: CreateCategoryDto, @Req() req) {
    return this.categoryService.create(createCategoryDto, req.user);
  }

  @ApiTags('API')
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpCode.CREATED,
    type: ResponseCategoryDto,
  })
  findAll(@Req() req): Promise<Category[]> {
    const { id } = req.user;
    return this.categoryService.findAll(id);
  }

  @ApiTags('API')
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @ApiTags('API')
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @ApiResponse({
    status: HttpCode.OK,
    type: UpdateCategoryDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @ApiTags('API')
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpCode.OK,
    type: RemoveCategoryDto,
  })
  remove(@Param('id') id: string): Promise<string> {
    return this.categoryService.remove(+id);
  }
}
