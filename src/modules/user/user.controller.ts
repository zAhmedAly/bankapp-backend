import { UsersService } from './user.service';
import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Res,
  Param,
  Headers,
  Req,
} from '@nestjs/common';
import { IUser } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  public async register(@Res() res, @Body() user: IUser): Promise<any> {
    const result: any = await this.usersService.create(user);
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return res.status(HttpStatus.OK).json(result);
  }

  // Create login endpoint
  @Post('login')
  public async login(@Res() res, @Body() credentials: any): Promise<any> {
    const result: any = await this.usersService.login(credentials);
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return res.status(HttpStatus.OK).json(result);
  }

  // Create authenticate endpoint
  @Post(':id')
  public async authenticate(
    @Param() params,
    @Res() res,
    @Req() req,
    @Headers() headers,
  ): Promise<any> {
    // Get token from authorization header
    // console.log('headers = ', headers);
    // console.log('params = ', params);
    // console.log('req = ', req.headers);
    // console.log('headers.authorization = ', headers.authorization);
    let token = headers.authorization.split(' ')[1];
    const result: any = await this.usersService.authenticate(params.id, token);
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return res.status(HttpStatus.OK).json(result);
  }
}
