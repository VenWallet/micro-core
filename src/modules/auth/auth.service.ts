import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpCustomService } from '../../shared/http/http.service';
import { UserService } from '../user/user.service';
import { ImportFromMnemonicDto, ImportFromPkDto } from './dto/auth.dto';
import { log } from 'console';
import { MovementService } from '../movement/movement.service';
import { MovementTypeEnum } from '../movement/enums/movementType.enum';
import { MovementDto } from '../movement/dto/movement.dto';
import { StatusEnum } from '../movement/enums/status.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly movementService: MovementService,
    private readonly httpService: HttpCustomService,
  ) {}

  async importFromMnemonic(importFromMnemonicDto: ImportFromMnemonicDto): Promise<any> {
    const responseUserId = await this.httpService.request<any>({
      method: 'POST',
      url: 'http://micro-blockchain:3000/api/wallet/get-user-id-by-mnemonic',
      body: { mnemonic: importFromMnemonicDto.mnemonic },
    });

    if (!responseUserId.data) {
      throw new UnauthorizedException('User not found');
    }

    const { userId } = responseUserId.data;

    const user = await this.userService.findOne(userId);

    const body = {
      mnemonic: importFromMnemonicDto.mnemonic,
      userId: userId,
    };

    const response = await this.httpService.request<any>({
      method: 'POST',
      url: 'http://micro-blockchain:3000/api/blockchain/import-wallets-from-mnemonic',
      body,
    });

    if (!response.data || typeof response.data.length !== 'number') {
      throw new InternalServerErrorException('Failed to import wallets');
    }

    const payload = {
      userId: user.id,
      loginMethod: 'MNEMONIC',
      mnemonic: importFromMnemonicDto.mnemonic,
      credentials: response.data,
    };

    const movement: MovementDto = {
      userId: user.id,
      movementType: MovementTypeEnum.LOGIN,
      movementDate: new Date(),
      status: StatusEnum.COMPLETED,
      description: payload.loginMethod,
    };

    this.movementService.create(movement);

    return {
      ...user,
      loginMethod: payload.loginMethod,
      token: await this.jwtService.signAsync(payload, { expiresIn: '7d' }),
      credencials: response.data,
    };
  }

  async importFromPk(importFromPkDto: ImportFromPkDto): Promise<any> {
    const responseUserId = await this.httpService.request<any>({
      method: 'POST',
      url: 'http://micro-blockchain:3000/api/wallet/get-user-id-by-pk',
      body: { mnemonic: importFromPkDto.privateKey },
    });

    if (!responseUserId.data) {
      throw new UnauthorizedException('User not found');
    }

    const { userId } = responseUserId.data;

    const user = await this.userService.findOne(userId);

    const body = {
      privateKey: importFromPkDto.privateKey,
      userId: userId,
    };

    const response = await this.httpService.request<any>({
      method: 'POST',
      url: 'http://micro-blockchain:3000/api/blockchain/import-wallets-from-pk',
      body,
    });

    if (!response.data || typeof response.data.length !== 'number') {
      throw new InternalServerErrorException('Failed to import wallets');
    }

    const payload = {
      userId: user.id,
      loginMethod: 'PRIVATE_KEY',
      privateKey: importFromPkDto.privateKey,
      credentials: response.data,
    };

    return {
      ...user,
      loginMethod: payload.loginMethod,
      token: await this.jwtService.signAsync(payload, { expiresIn: '7d' }),
      credencials: response.data,
    };
  }
}
