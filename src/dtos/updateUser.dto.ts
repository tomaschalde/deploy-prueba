import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Matches, IsOptional } from "class-validator";

export class UpdateUserDto {

    /**
     * La propiedad name es opcional. En caso de utilizarla, debe ser un string de minimo 3 caracteres y maximo 80 caracteres. No puede estar vacio
     * @example "User Example"
    */
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    name : string

    /**
     * La propiedad email es opcional. En caso de utilizarla, debe ser de tipo email y no puede estar vacio
     * @example exampleUser@gmail.com
    */
    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    email: string

    /**
     * La propiedad passsword es opcional. En caso de utilizarla, debe ser un string con minimo 8 caracteres, maximo 15 caracteres, debe tener al menos una letra mayuscula, una letra minuscula y un caracter especial. No puede estar vacio
     * @example Password123!
    */
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Length(8,15)
    @Matches('/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/')
    password: string

    /**
     * La propiedad address es opcinal. En caso de utilizarla, debe ser un string con minimo 3 caracteres y maximo 80 caracteres. No puede estar vacio
     * @example "AddressExample 123"
    */
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    address: string

    /**
     * La propiedad phone es opcional.En caso de utilizarla, debe ser un numero y no puede estar vacio
     * @example 123456789
    */
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    phone: number

    /**
     * La propiedad country es opcional. En caso de utilizarla, debe ser un string con minimo 5 caracteres y maximo 20. No puede estar vacio
     * @example "Country Example"
    */
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Length(5,20)
    country: string

    /**
     * La propiedad city es opcional. En caso de utilizarla, debe ser un string con minimo 5 caracteres y maximo 20. No puede estar vacio
     * @example CityExample
    */
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Length(5, 20)
    city: string

}