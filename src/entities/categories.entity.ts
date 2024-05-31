import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Products } from "./products.entity";

@Entity({
    name: "categories"
})
export class Categories {

    /**
     * Este id se generará automaticamente con el tipo uuid
     * @example 550e8400-e29b-41d4-a716-446655440000
     */
    @PrimaryGeneratedColumn('uuid')
    id:string

    /**
     * El name debe ser una cadena de texto, con un largo maximo de 50 caracteres, unico y no debe ser nulo
     * @example monitor
     */
    @Column({type: 'varchar' ,length: 50,  unique : true, nullable: false})
    name:string


    @OneToMany( () => Products, (product) => product.category)
    @JoinColumn()
    products: Products[]; 
}