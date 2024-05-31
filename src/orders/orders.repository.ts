import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Orders } from "src/entities/orders.entity";
import { OrdersDetails } from "src/entities/ordersDetails.entity";
import { Products } from "src/entities/products.entity";
import { Users } from "src/entities/users.entity";
import {Repository } from "typeorm";

@Injectable()
export class OrdersRepository{
    constructor(
        @InjectRepository(Orders) private ordersRepository : Repository<Orders>,
        @InjectRepository(OrdersDetails) private ordersDetailsRepository : Repository <OrdersDetails>,
        @InjectRepository(Products) private productsRepository : Repository <Products>,
        @InjectRepository(Users) private usersRepository : Repository <Users>
    ){}

    async getOrder(id : string) {
        const order = await this.ordersRepository.findOne({
            where:{id}, 
            relations:{
                orderDetails: { 
                    products : true 
                }  
            }
        });

        if(!order) throw new BadRequestException(`No se encontró la orden con id ${id}`);

        return order;
    }

    async addOrder(userId : string, products : any) {

        try {
            let total = 0;

            const user = await this.usersRepository.findOneBy({ id : userId })
            if(!user) throw new BadRequestException(`No se encontró el usuario con id ${userId}`)
            
            
    
            const order = new Orders()
            order.date = new Date()
            order.user = user;
    
            const idProducts = new Set();
    
            const arrayProducts = await Promise.all(
    
                products.map(async (element) => { 
    
                    const product = await this.productsRepository.findOneBy({ id: element.id})
                    if(!product) throw new BadRequestException(`No se encontró el producto con id ${element.id}`);
    
                    if(idProducts.has(product.id)) {
                        throw new BadRequestException(`Solo puedes agregar una unidad del producto: ${product.name}`)
                    }else{
                        idProducts.add(product.id)
                    }
    
                    if(product.stock < 1) {
                        throw new BadRequestException(`No hay más stock del producto: ${product.name}`)
                    }
                    
    
                    total += Number(product.price);

                    await this.productsRepository.update(
                        {id: element.id},
                        {stock: product.stock - 1}
                    );
                    
                    return product;
                

                })
                
            );
            
            const newOrder = await this.ordersRepository.save(order);
            
            const orderDetail = new OrdersDetails()
            orderDetail.price = Number(Number(total).toFixed(2)) 
            orderDetail.products = arrayProducts 
            orderDetail.order = newOrder; 
    
    
            await this.ordersDetailsRepository.save(orderDetail);
    
            
            return await this.ordersRepository.find({
                where: {id: newOrder.id}, 
                relations:{
                    orderDetails:true 
                }
            });
            
        } catch (error) {
            return {status: error.status,message:error.message}
        }

    }

    async deleteOrder(id : string){

        const order = await this.ordersRepository.findOne({where:{id : id}, relations: {orderDetails:true}})
        if(!order) throw new BadRequestException(`No se encontro el usuario con id ${id}`);

        const orderDetail = order.orderDetails;

        if(orderDetail)  await this.ordersDetailsRepository.remove(orderDetail) 

        await this.ordersRepository.remove(order);
    }
}