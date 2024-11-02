import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Req, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ImportFromMnemonicDto, ImportFromPkDto } from './dto/auth.dto';
import { AuthGuard } from 'src/helpers/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('import-from-mnemonic')
  @HttpCode(HttpStatus.OK)
  importFromMnemonic(@Body() importFromMnemonicDto: ImportFromMnemonicDto) {
    return this.authService.importFromMnemonic(importFromMnemonicDto);
  }

  @Post('import-from-pk')
  @HttpCode(HttpStatus.OK)
  importFromPk(@Body() importFromPkDto: ImportFromPkDto) {
    return this.authService.importFromPk(importFromPkDto);
  }

  @Post('check-user')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  checkUser(@Req() request: Request) {
    return request['user'];
  }
}
