import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto } from './dto';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class HabitService {
  constructor(private prisma: PrismaService) {}

  async getAllHabits(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    return this.prisma.habit.findMany({
      select: {
        id: true,
        title: true,
        desc: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async createHabit(userId: number, dto: CreateDto) {
    const habit = await this.prisma.habit.create({
      data: {
        userId,
        ...dto,
      },
    });

    return habit;
  }

  async getHabitById(userId: number, habitId: number) {
    const habit = await this.prisma.habit.findFirst({
      where: {
        id: habitId,
        userId,
      },
    });

    if (!habit) {
      throw new ForbiddenException('Habit not found');
    }

    return habit;
  }

  async updateHabitById(userId: number, habitId: number, dto: UpdateDto) {
    const habit = await this.prisma.habit.findFirst({
      where: {
        id: habitId,
      },
    });

    if (!habit || habit.userId !== userId) {
      throw new UnauthorizedException();
    }

    return this.prisma.habit.update({
      where: {
        id: habitId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteHabitById(userId: number, habitId: number) {
    const habit = await this.prisma.habit.findFirst({
      where: {
        id: habitId,
      },
    });

    if (!habit || habit.userId !== userId) {
      throw new UnauthorizedException();
    }

    await this.prisma.habit.delete({
      where: {
        id: habitId,
      },
    });
  }
}
