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
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { endPoints } from '@eco/config';
import { ContentTypes, UserFull } from '@eco/types';
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
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ContentEntity })
  @ApiResponse({
    status: 201,
    description: 'Content has been successfully created.',
  })
  async create(@Req() {user}: Request, @Body() createContentDto: CreateContentDto) {
    return new ContentEntity(
      await this.contentService.create(createContentDto, user as UserFull)
    );
  }

  @Get('list/:type')
  @UseGuards(JwtAuthGuard, EmailGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ContentEntity, isArray: true })
  @ApiResponse({
    status: 200,
    description: 'Content list has been successfully loaded.',
  })
  async findAll(@Req() {user}: Request, @Param('type') type: ContentTypes) {
    const contents = await this.contentService.findAll(user as UserFull, type);
    return contents.map((content) => new ContentEntity(content));
  }

  @Get(':id/:type')
  @UseGuards(JwtAuthGuard, EmailGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ContentEntity })
  @ApiResponse({
    status: 200,
    description: 'Content has been successfully loaded.',
  })
  async findOne(@Req() {user}: Request, @Param('id') id: string, @Param('type') type: ContentTypes) {
    const content = new ContentEntity(await this.contentService.findOne(id, user as UserFull, type));
    if (!content) {
      throw new NotFoundException(`Content with ${id} does not exist.`);
    }
    return content;
  }

  @Patch(':id/:type')
  @UseGuards(JwtAuthGuard, EmailGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ContentEntity })
  @ApiResponse({
    status: 200,
    description: 'Content has been successfully updated.',
  })
  async update(
    @Req() {user}: Request,
    @Param('id') id: string,
    @Param('type') type: ContentTypes,
    @Body() updateContentDto: UpdateContentDto
  ) {
    return new ContentEntity(
      await this.contentService.update(id, updateContentDto, user as UserFull, type)
    );
  }

  @Delete(':id/:type')
  @UseGuards(JwtAuthGuard, EmailGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ContentEntity })
  @ApiResponse({
    status: 200,
    description: 'Content has been successfully deleted.',
  })
  async remove(@Req() {user}: Request, @Param('id') id: string, @Param('type') type: ContentTypes) {
    return new ContentEntity(await this.contentService.remove(id, user as UserFull, type));
  }
}
