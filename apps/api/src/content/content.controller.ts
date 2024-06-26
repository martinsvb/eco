import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  NotFoundException,
  Query
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
  constructor(
    private readonly contentService: ContentService
  ) {}

  @Post('/:language')
  @UseGuards(JwtAuthGuard, EmailGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ContentEntity })
  @ApiResponse({
    status: 201,
    description: 'Content has been successfully created.',
  })
  async create(
    @Req() {user}: Request,
    @Param('language') language: string,
    @Body() createContentDto: CreateContentDto,
    @Headers('origin') origin: string
  ) {
    return new ContentEntity(
      await this.contentService.create(createContentDto, user as UserFull, language, origin),
      user as UserFull
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
  async findAll(
    @Req() {user}: Request,
    @Param('type') type: ContentTypes,
    @Query() query
  ) {
    const contents = await this.contentService.findAll(user as UserFull, type, query);
    return contents.map((content) => new ContentEntity(content, user as UserFull));
  }

  @Get('list-childs/:type/:parentId')
  @UseGuards(JwtAuthGuard, EmailGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ContentEntity, isArray: true })
  @ApiResponse({
    status: 200,
    description: 'Content childs list has been successfully loaded.',
  })
  async findAllChilds(
    @Req() {user}: Request,
    @Param('type') type: ContentTypes,
    @Param('parentId') parentId: string
  ) {
    const contents = await this.contentService.findAllChilds(user as UserFull, type, parentId);
    return contents.map((content) => new ContentEntity(content, user as UserFull));
  }

  @Get(':id/:type')
  @UseGuards(JwtAuthGuard, EmailGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ContentEntity })
  @ApiResponse({
    status: 200,
    description: 'Content has been successfully loaded.',
  })
  async findOne(
    @Req() {user}: Request,
    @Param('id') id: string,
    @Param('type') type: ContentTypes
  ) {
    const data = await this.contentService.findOne(id, user as UserFull, type);
    if (!data) {
      throw new NotFoundException(`Content with ${id} does not exist.`);
    }
    const content = new ContentEntity(data, user as UserFull);
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
    @Body() data: UpdateContentDto
  ) {
    return new ContentEntity(
      await this.contentService.update(id, data, user as UserFull, type),
      user as UserFull
    );
  }

  @Patch('approve/:id/:type/:language')
  @UseGuards(JwtAuthGuard, EmailGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ContentEntity })
  @ApiResponse({
    status: 200,
    description: 'Content approval has been successfully updated.',
  })
  async approve(
    @Req() {user}: Request,
    @Param('id') id: string,
    @Param('type') type: ContentTypes,
    @Param('language') language: string,
    @Headers('origin') origin: string
  ) {
    return new ContentEntity(
      await this.contentService.approve(id, user as UserFull, type, language, origin),
      user as UserFull
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
  async remove(
    @Req() {user}: Request,
    @Param('id') id: string,
    @Param('type') type: ContentTypes
  ) {
    return new ContentEntity(
      await this.contentService.remove(id, user as UserFull, type),
      user as UserFull
    );
  }
}
