import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { AuthService } from 'src/auth/auth.service';
import { Orders } from 'src/entities/orders.entity';
import { OrdersRepository } from 'src/orders/orders.repository';
import { OrdersDetails } from 'src/entities/ordersDetails.entity';
import { Products } from 'src/entities/products.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Users,Orders, OrdersDetails,Products])],
  controllers: [UsersController],
  providers: [UsersService,UsersRepository, AuthService,OrdersRepository]
})
export class UsersModule {}
