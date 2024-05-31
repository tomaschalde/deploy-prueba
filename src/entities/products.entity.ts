import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categories } from "./categories.entity";
import { OrdersDetails } from "./ordersDetails.entity";

@Entity({
    name: 'products'
})
export class Products {

    /**
     * Este id se generará automaticamente con el tipo uuid
     * @example 550e8400-e29b-41d4-a716-446655440000
     */
    @PrimaryGeneratedColumn('uuid')
    id: string

    /**
     * El name  debe ser una cadena de texto, con un maximo largo de 50 caracteres y no debe ser nulo
     * @example Nombre Example
     */
    @Column({type: 'varchar', length: 50, unique : true ,nullable: false})
    name: string

    /**
     * La description debe ser de tipo text y no debe ser nulo
     * @example Description Example
     */
    @Column({type: 'text', nullable: false})
    description: string

    /**
     * El price debe ser de tipo decimal, con una precision de 10 digitos, un scale de 2 digitos y no debe ser nulo.
     * @example 1200.01
     */
    @Column({type: 'decimal', precision:10, scale: 2, nullable: false}) // 10000000000.00 (Este seria maximo numero que acepta)
    price: number

    /**
     * El stock debe ser de tipo int y no debe ser nulo
     * @example 5
     */
    @Column({type: 'int', nullable: false})
    stock: number

    /**
     * El imgUrl debe ser de tipo text y por default tendra una url
     * @example "https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"
     */
    @Column({
        type: 'text',
        default: "https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"
    })
    imgUrl: string


    @ManyToOne( () => Categories, (category) => category.products, {cascade : true})
    @JoinColumn( {name : 'category_id'}) 
    category : Categories 

   
    @ManyToMany ( () => OrdersDetails, (orderDetails) => orderDetails.products)
    orderDetails: OrdersDetails[] 
}