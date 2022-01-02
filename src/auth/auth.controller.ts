import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './decorator/user.decorator';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { UserResponseInterface } from './types/userResponse.interface';
import { UsersEntity } from './users.entity';
import { VerifyDBEntity } from './verifyDB.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @Post()
    @UsePipes(new ValidationPipe())
    async createUser(
        @Body('user') createUserDto: CreateUserDto
        ): Promise<any> {
        const user = await this.authService.createVerify(createUserDto);
        return user
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(
        @Body('user') loginUserDto: LoginUserDto
        ): Promise<UserResponseInterface> {
        const user = await this.authService.login(loginUserDto);
        return this.authService.buildUserResponse(user)
    }

    @Get('user')
    @UseGuards(AuthGuard)
    async currentUser(@User() user: UsersEntity): Promise<UserResponseInterface> {
      return this.authService.buildUserResponse(user);
    }

    @Post('test')
    async signTest(
        @Body() sign: any
        ): Promise<any> {
         //   console.log(sign)
        const val = await this.authService.signMessage(sign);
        return val
    }
    @Post('testdecode')
    async verifyTest(
        @Body() sign: any
        ): Promise<any> {
         //   console.log(sign)
        const val = await this.authService.verifyMessage(sign);
        return val
    }
}
