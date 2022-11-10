import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto, SignInUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign_up')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @Post('sign_in')
  signInUser(@Body() signInUserDto: SignInUserDto) {
    return this.authService.signInUser(signInUserDto);
  }

  @Get('test')
  @UseGuards(AuthGuard())
  test() {
    return 'test private router';
  }
}
