import { BadRequestException, Body, Controller, Get, Param, ParseUUIDPipe, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from 'src/dtos/createOrder.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {

    constructor(private readonly ordersService : OrdersService){}
    
    @ApiBearerAuth()
    @Get(":id")
    @UseGuards(AuthGuard)
    @UsePipes()
    getOrder(@Param('id', ParseUUIDPipe) id : string, @Req() request : Request & {user : any}){
        console.log(request.user)
        return this.ordersService.getOrder(id)
    }

    @ApiBearerAuth()
    @Post()
    @UseGuards(AuthGuard)
    addOrder(@Body() order : CreateOrderDto, @Req() request : Request & {user : any} ){
        const {userId, products } = order;
        if(request.user.id !== userId)
            throw new BadRequestException("El usuario que realiza la peticion no está logueado")
        return this.ordersService.addOrder(userId,products)

    }
}
