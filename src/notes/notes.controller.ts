import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'auth/auth.guard';

import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './schemas/note.schema';

@Controller('notes')
@UseGuards(AuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto, @Req() req): Promise<Note> {
    return this.notesService.create(createNoteDto, req.user);
  }

  @Get()
  findAll(@Req() req): Promise<Note[]> {
    return this.notesService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req): Promise<Note> {
    return this.notesService.findOne(id, req.user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @Req() req,
  ): Promise<Note> {
    return this.notesService.update(id, updateNoteDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req): Promise<Note> {
    return this.notesService.remove(id, req.user);
  }
}
