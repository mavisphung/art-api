import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './api/users/users.module';
import { ProductsModule } from './api/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './api/auth/auth.module';

@Module({
  imports: [
    // use .env
    ConfigModule.forRoot(
      {
        isGlobal: true,
      }
    ),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        console.log('Connecting to mongodb...');
        console.log('Mongo url: ' + process.env.MONGO_DB);
        return {
          type: 'mongodb',
          url: process.env.MONGO_DB,
          // database: process.env.MONGODB_DATABASE,
          entities: [
            __dirname + '/**/*.entity{.ts,.js}',
          ],
          // ssl: false,
          synchronize: false,
          useUnifiedTopology: true,
          useNewUrlParser: true,
          logging: true,
        }
      }
    }),
    UsersModule,
    ProductsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
