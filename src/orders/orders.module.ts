import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from 'src/entities/orders.entity';
import { OrdersDetails } from 'src/entities/ordersDetails.entity';
import { Users } from 'src/entities/users.entity';
import { Products } from 'src/entities/products.entity';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, OrdersDetails, Users, Products])],
  controllers: [OrdersController],
  providers: [OrdersService,OrdersRepository]
})
export class OrdersModule {}
