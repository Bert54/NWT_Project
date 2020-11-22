import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDao } from './dao/users.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { AuthService } from '../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants/jwt-constants';

@Module({
  imports: [ JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '3d' },
  }), MongooseModule.forFeature([ { name: 'Users', schema: UserSchema } ]) ],
  providers: [ AuthService, UsersService, UsersDao ],
  exports: [ UsersService ],
  controllers: [ UsersController ],
})
export class UsersModule {}
