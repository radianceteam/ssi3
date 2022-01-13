import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { UsersEntity } from './users.entity';
import { VerifyDBEntity } from './verifyDB.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VerifyDBEntity]),
             TypeOrmModule.forFeature([UsersEntity]),
            ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
