import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, BadRequestException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { GenerateOtpDto, UpdateUserDto, UserDto, ValidateOtpDto } from './dto/user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: UserDto) {
    return this.userService.create(createUserDto);
  }

  // @Post('import')
  // import(@Body() importUserDto: ImportUserDto) {
  //   return this.userService.import(importUserDto);
  // }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }

  @Post('generate-otp')
  async generateOtp(@Body() generateOtpDto: GenerateOtpDto) {
    return this.userService.generateOtp(generateOtpDto.email);
  }

  @Post('validate-otp')
  async validateOtp(@Body() validateOtpDto: ValidateOtpDto) {
    return await this.userService.validateOtp(validateOtpDto.email, validateOtpDto.otp);
  }
}
