import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CreateProductDto {

    /**
     * La propiedad name debe ser un string con minimo 5 caracteres y maximo 20 caracteres. No puede estar vacia.
     * @example "New Product Example"
     */
    @IsNotEmpty()
    @IsString()
    @Length(5, 20)
    name: string

    /**
     * La propiedad description debe ser un string con minimo 5 caracteres y maximo 50 caracteres. No puede estar vacia.
     * @example "Example description new product"
     */
    @IsNotEmpty()
    @IsString()
    @Length(5, 50)
    description: string

    /**
     * La propiedad price debe ser un numero y no puede estar vacia
     * @example 20.00
     */
    @IsNotEmpty()
    @IsNumber()
    price: number

    /**
     * La propiedad stock debe ser un numero y no puede estar vacia
     * @example 5
     */
    @IsNotEmpty()
    @IsNumber()
    stock: number

    /**
     * La propiedad category debe ser un string con minimo 5 caracteres y maximo 20 caracteres. No puede estar vacia y debe ser una categoria existente
     * @example monitor
    */
    @IsNotEmpty()
    @IsString()
    @Length(5, 20)
    category: string

    /**
     * La propiedad imgUrl debe ser un string con minimo 5 caracteres y maximo 80 caracteres. No puede estar vacia
     * @example http://exampleImage.com
     */
    @IsNotEmpty()
    @IsString()
    @Length(5, 80)
    imgUrl: string
}