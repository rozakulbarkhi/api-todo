import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { HabitService } from './habit.service';
import { JwtAuthGuard } from 'src/auth/guard';
import { getUser } from 'src/auth/decorator';
import { CreateDto } from './dto';
import { UpdateDto } from './dto/update.dto';

@UseGuards(JwtAuthGuard)
@Controller('habits')
export class HabitController {
  constructor(private habitService: HabitService) {}

  @Get()
  getAllHabits(@getUser('id') userId: number) {
    return this.habitService.getAllHabits(userId);
  }

  @Post()
  createHabit(@getUser('id') userId: number, @Body() dto: CreateDto) {
    return this.habitService.createHabit(userId, dto);
  }

  @Get(':id')
  getHabitById(
    @getUser('id') userId: number,
    @Param('id', ParseIntPipe) habitId: number,
  ) {
    return this.habitService.getHabitById(userId, habitId);
  }

  @Patch(':id')
  updateHabitById(
    @getUser('id') userId: number,
    @Param('id', ParseIntPipe) habitIt: number,
    @Body() dto: UpdateDto,
  ) {
    return this.habitService.updateHabitById(userId, habitIt, dto);
  }

  @Delete(':id')
  deleteHabiyById(
    @getUser('id') userId: number,
    @Param('id', ParseIntPipe) habitIt: number,
  ) {
    return this.habitService.deleteHabitById(userId, habitIt);
  }
}
