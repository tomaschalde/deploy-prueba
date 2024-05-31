import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import {config as dotenvConfig} from 'dotenv';
import { preloadData } from './utils/preload.utils';
import { Products } from './entities/products.entity';
import { Categories } from './entities/categories.entity';
import { Users } from './entities/users.entity';



dotenvConfig({path:'.env.development'})

@Module({
  imports: [
            ConfigModule.forRoot({
              isGlobal: true,
              load: [typeorm]
            }),
            TypeOrmModule.forRootAsync({
              inject: [ConfigService],
              useFactory: (config : ConfigService) => config.get('typeorm')
            }),
            JwtModule.register({
              global: true,
              signOptions: {expiresIn: '1h'},
              secret: process.env.JWT_SECRET,
            }),
            UsersModule, 
            ProductsModule, 
            AuthModule, 
            CategoriesModule,
            OrdersModule,
            FileUploadModule,
            TypeOrmModule.forFeature([Products,Categories,Users])
          ],
  controllers: [AppController],
  providers: [AppService, preloadData],
})
export class AppModule implements OnModuleInit{ 
  constructor(private readonly preloadData : preloadData) {}

  async onModuleInit() {
    await this.preloadData.preloadDataCategories()
    await this.preloadData.preloadDataProducts()
    await this.preloadData.preloadAdmin()
  }
}
