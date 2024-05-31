import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { OrdersDetails } from "./ordersDetails.entity";
import { Users } from "./users.entity";


@Entity({
    name: 'orders'
})

export class Orders {

    /**
     * Este id se generará automaticamente con el tipo uuid
     * @example 550e8400-e29b-41d4-a716-446655440000
     */
    @PrimaryGeneratedColumn('uuid')
    id: string

    /**
     * El date debe ser una fecha con el formato dd/mm/yy
     * @example 01/01/2024
     */
    @Column()
    date: Date

   
    @OneToOne(() => OrdersDetails, (orderDetails) => orderDetails.order)
    orderDetails: OrdersDetails;

    @ManyToOne( () => Users, (user) => user.orders)
    @JoinColumn({name : 'user_id'})
    user: Users
    
}