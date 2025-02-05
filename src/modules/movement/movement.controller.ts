import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { MovementService } from './movement.service';
import { MovementDto } from './dto/movement.dto';
import { MovementTypeEnum } from './enums/movementType.enum';
import { StatusEnum } from './enums/status.enum';

@ApiTags('Movement')
@Controller('movement')
export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  @Post()
  create(@Body() createMovementDto: MovementDto) {
    return this.movementService.create(createMovementDto);
  }

  @Get(':userId')
  @ApiQuery({ name: 'status', required: false, enum: StatusEnum, description: 'Estado del movimiento' })
  @ApiQuery({ name: 'fromNetwork', required: false, type: String, description: 'Red de origen' })
  @ApiQuery({ name: 'toNetwork', required: false, type: String, description: 'Red de destino' })
  @ApiQuery({ name: 'fromCoin', required: false, type: String, description: 'Moneda de origen' })
  @ApiQuery({ name: 'toCoin', required: false, type: String, description: 'Moneda de destino' })
  @ApiQuery({ name: 'movementType', required: false, enum: MovementTypeEnum, description: 'Tipo de movimiento' })
  @ApiQuery({ name: 'currency', required: false, type: String, description: 'Moneda' })
  @ApiQuery({ name: 'fromAccount', required: false, type: String, description: 'Cuenta de origen' })
  @ApiQuery({ name: 'toAccount', required: false, type: String, description: 'Cuenta de destino' })
  @ApiQuery({
    name: 'startDate',
    required: false,
    type: String,
    description: 'Fecha de inicio',
    example: '2024-12-01',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    type: String,
    description: 'Fecha de fin',
    example: '2024-12-01',
  })
  findByUserId(
    @Param('userId') userId: string,
    @Query('status') status?: StatusEnum,
    @Query('fromNetwork') fromNetwork?: string,
    @Query('toNetwork') toNetwork?: string,
    @Query('fromCoin') fromCoin?: string,
    @Query('toCoin') toCoin?: string,
    @Query('movementType') movementType?: MovementTypeEnum,
    @Query('currency') currency?: string,
    @Query('fromAccount') fromAccount?: string,
    @Query('toAccount') toAccount?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.movementService.findByUserId(userId, {
      status,
      fromNetwork,
      toNetwork,
      fromCoin,
      toCoin,
      movementType,
      currency,
      fromAccount,
      toAccount,
      startDate,
      endDate,
    });
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
