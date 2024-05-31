import { ApiHideProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, Length, Matches, Validate } from "class-validator";
import { MatchPassword } from "src/decorators/matchPass.decorator";


export class CreateUserDto {

    /**
     * La propiedad name debe ser un string de minimo 3 caracteres y maximo 80 caracteres. No puede estar vacio
     * @example UserExample
    */
    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    name : string

    /**
     * La propiedad email debe ser de tipo email y no puede estar vacio
     * @example exampleUser@gmail.com
    */
    @IsNotEmpty()
    @IsEmail()
    email: string

    /**
     * La propiedad passsword debe ser un string con minimo 8 caracteres, maximo 15 caracteres, debe tener al menos una letra mayuscula, una letra minuscula y un caracter especial. No puede estar vacio
     * @example Password123!
    */
    @IsNotEmpty()
    @IsString()
    @Length(8,15)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    password: string

    /**
     * La propiedad confirmPassword debe ser exactamente igual a la propiedad password
     * @example Password123!
    */
    @IsNotEmpty()
    @Validate(MatchPassword, ['password'])
    confirmPassword: string

    /**
     * La propiedad address debe ser un string con minimo 3 caracteres y maximo 80 caracteres. No puede estar vacio
     * @example "AddressExample 123"
    */
    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    address: string

    /**
     * La propiedad phone debe ser un numero y no puede estar vacio
     * @example 123456789
    */
    @IsNotEmpty()
    @IsNumber()
    phone: number

    /**
     * La propiedad country debe ser un string con minimo 5 caracteres y maximo 20. No puede estar vacio
     * @example "Country Example"
    */
    @IsNotEmpty()
    @IsString()
    @Length(5,20)
    country: string

    /**
     * La propiedad city debe ser un string con minimo 5 caracteres y maximo 20. No puede estar vacio
     * @example CityExample
    */
    @IsNotEmpty()
    @IsString()
    @Length(5, 20)
    city: string

    @ApiHideProperty()
    @IsEmpty()
    isAdmin: boolean



}