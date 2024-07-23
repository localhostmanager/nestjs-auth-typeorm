import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: 'root',
      password: '',
      port: 3306,
      database: 'typeorm',
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      timezone: 'Z',
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
