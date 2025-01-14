import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MovementService } from './movement.service';
import { MovementDto } from './dto/movement.dto';

@ApiTags('Movement')
@Controller('movement')
export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  @Post()
  create(@Body() createMovementDto: MovementDto) {
    return this.movementService.create(createMovementDto);
  }

  @Get(':userId')
  findByUserId(@Param('userId') userId: string) {
    return this.movementService.findByUserId(userId);
  }

  @Get()
  findAll() {
    return this.movementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.movementService.findOne(id);
  }
}
