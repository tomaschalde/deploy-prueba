import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator"

export class UpdateProductDto {

        /**
        * La propiedad name es opcional. En caso de utilizarla, debe ser un string con minimo 5 caracteres y maximo 20 caracteres. No puede estar vacia.
        * @example "New Product Example"
        */
        @IsOptional()
        @IsNotEmpty()
        @IsString()
        @Length(5, 20)
        name: string
    
        /**
         * La propiedad description es opcional. En caso de utilizarla, debe ser un string con minimo 5 caracteres y maximo 50 caracteres. No puede estar vacia.
         * @example "Example description new product"
        */
        @IsOptional()
        @IsNotEmpty()
        @IsString()
        @Length(5, 50)
        description: string
    
        /**
         * La propiedad price es opcional. En caso de utilizarla, debe ser un numero y no puede estar vacia
         * @example 20.00
         */
        @IsOptional()
        @IsNotEmpty()
        @IsNumber()
        price: number
    
        /**
         * La propiedad stock es opcional. En caso de utilizarla, debe ser un numero y no puede estar vacia
         * @example 5
         */
        @IsOptional()
        @IsNotEmpty()
        @IsNumber()
        stock: number
    
    
        /**
         * La propiedad imgUrl es opcional. En caso de utilizarla, debe ser un string con minimo 5 caracteres y maximo 80 caracteres. No puede estar vacia
         * @example http://exampleImage.com
         */
        @IsOptional()
        @IsNotEmpty()
        @IsString()
        @Length(5, 80)
        imgUrl: string
}