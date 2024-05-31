import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./orders.entity";

@Entity({
    name: 'users'
})

export class Users {

    /**
     * Este id se generará automaticamente con el tipo uuid
     * @example 550e8400-e29b-41d4-a716-446655440000
     */
    @PrimaryGeneratedColumn('uuid')
    id:string

    /**
     * El name debe ser una cadena de texto, con un maximo de 50 caracteres de largo y no puede ser nulo
     * @example "Name Example"
     */
    @Column({ type: 'varchar',length: 50, nullable: false })
    name: string

    /**
     * El email debe ser una cadena de texto, con un maximo de 50 caracteres de largo, debe ser unico y no puede ser nulo
     * @example emailExample@example.com
     */
    @Column({ type: 'varchar', length: 50, unique: true ,nullable : false})
    email: string

    /**
     * El password debe ser una cadena de texto, con un largo maximo de 100 caracteres y no debe ser nulo
     * @example 912e2f9a2bb50e6f29cc34035b3af3ec5711c1922d4f20c5e3d7c0129f3fe8af
     */
    @Column({ type:'varchar',length: 100, nullable: false})
    password: string

    /**
     * El phone debe ser un numero de tipo integer
     * @example 123456789
     */
    @Column({type: 'int'})
    phone: number

    /**
     * El country debe ser una cadena de texto, con un largo maximo de 50 caracteres
     * @example Country example
     */
    @Column({type:'varchar',length: 50})
    country: string

    /**
     * El address debe ser de tipo text
     * @example Address example
     */
    @Column({type:'text'}) 
    address: string

    /**
     * El city debe ser una cadena de texto, con un largo maximo de 50 caracteres
     * @example Ciudad Example
     */
    @Column({type:'varchar',length: 50})
    city: string

    /**
     * El admin debe ser un boolean que por defecto será false
     */
    @Column({ default : false})
    isAdmin: boolean


    @OneToMany( () => Orders, (order) => order.user) 
    orders: Orders[];

}