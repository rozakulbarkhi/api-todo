import { IsOptional, IsString } from 'class-validator';

export class CreateDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  desc: string;
}
