import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./orders.entity";
import { Products } from "./products.entity";

@Entity({
    name: 'order_details'
})

export class OrdersDetails{

    /**
     * Este id se generará automaticamente con el tipo uuid
     * @example 550e8400-e29b-41d4-a716-446655440000
     */
    @PrimaryGeneratedColumn('uuid')
    id: string

    /**
     * El price debe ser de tipo decimal, con una precision de 10 digitos, un scale de 2 digitos y no debe ser nulo.
     * @example 1200.01
     */
    @Column({type: 'decimal', precision:10, scale: 2, nullable: false})
    price: number

   
    @OneToOne( () => Orders, (order) => order.orderDetails, {cascade:true})
    @JoinColumn({name: 'order_id'})
    order: Orders;

    @ManyToMany( () => Products)
    @JoinTable({ 
        name: 'orderDetails_products',
        joinColumn: { 
            name: 'product_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'orderdetail_id',
            referencedColumnName: 'id'
        }
    })
    products: Products[]; 
}