import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersRepository } from "src/users/users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/entities/users.entity";
import { UsersService } from "src/users/users.service";
import { Orders } from "src/entities/orders.entity";
import { OrdersRepository } from "src/orders/orders.repository";
import { OrdersDetails } from "src/entities/ordersDetails.entity";
import { Products } from "src/entities/products.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Users,Orders,OrdersDetails,Products])],
    controllers: [AuthController],
    providers: [AuthService,UsersService, UsersRepository,OrdersRepository]
})
export class AuthModule{}