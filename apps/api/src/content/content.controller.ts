import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  NotFoundException
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { User } from '@prisma/client';
import { endPoints } from '@eco/config';
import { EmailGuard } from '../auth/email.guard';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ContentEntity } from './entities/content.entity';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@ApiTags('Content')
@Controller(endPoints.content)
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  @UseGuards(JwtAuthGuard, EmailGuard)
  @ApiCreatedResponse({ type: ContentEntity })
  @ApiResponse({
    status: 201,
    description: 'Content has been successfully created.',
  })
  async create(@Req() {user}: Request, @Body() createContentDto: CreateContentDto) {
    return new ContentEntity(
      await this.contentService.create(createContentDto, user as User)
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard, EmailGuard)
  @ApiOkResponse({ type: ContentEntity, isArray: true })
  @ApiResponse({
    status: 200,
    description: 'Contents has been successfully loaded.',
  })
  async findAll(@Req() {user}: Request) {
    const contents = await this.contentService.findAll(user as User);
    return contents.map((content) => new ContentEntity(content));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, EmailGuard)
  @ApiOkResponse({ type: ContentEntity })
  @ApiResponse({
    status: 200,
    description: 'Content has been successfully loaded.',
  })
  async findOne(@Param('id') id: string) {
    const content = new ContentEntity(await this.contentService.findOne(id));
    if (!content) {
      throw new NotFoundException(`Content with ${id} does not exist.`);
    }
    return content;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, EmailGuard)
  @ApiOkResponse({ type: ContentEntity })
  @ApiResponse({
    status: 200,
    description: 'Content has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateContentDto: UpdateContentDto
  ) {
    return new ContentEntity(
      await this.contentService.update(id, updateContentDto)
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, EmailGuard)
  @ApiOkResponse({ type: ContentEntity })
  @ApiResponse({
    status: 200,
    description: 'Content has been successfully deleted.',
  })
  async remove(@Param('id') id: string) {
    return new ContentEntity(await this.contentService.remove(id));
  }
}
