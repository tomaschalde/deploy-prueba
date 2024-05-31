import { IsEmail, IsNotEmpty,IsString, Length, Matches } from "class-validator";

export class LoginUserDto {

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
    @Length(8,80)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    password: string
}