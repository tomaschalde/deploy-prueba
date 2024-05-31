import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersRepository } from "src/users/users.repository";
import { Users } from "src/entities/users.entity";
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";




@Injectable()
export class AuthService {

    constructor(private readonly usersRepository : UsersRepository, private jwtService : JwtService) {}

    getAuth(){
        return 'Authentication'
    }

    async signUp(user : Partial <Users>) {

        const dbUser = await this.usersRepository.getUserByEmail(user.email)
        if(dbUser) throw new BadRequestException("El email ya existe")

        const hashedPassword = await bcrypt.hash(user.password, 10)
        if(!hashedPassword) throw new BadRequestException("La password no pudo ser hasheada")
        
        return await this.usersRepository.createUser({...user, password: hashedPassword})

    }

    async signIn(email : string, password: string) {

        const dbUser = await this.usersRepository.getUserByEmail(email)
        if(!dbUser) throw new BadRequestException("Credenciales incorrectos")

        const isPasswordValid = bcrypt.compare(password, dbUser.password)
        if(!isPasswordValid) throw new BadRequestException('Credenciales incorrectos')

        const userPayload = {
            id: dbUser.id,
            email: dbUser.email,
            isAdmin: dbUser.isAdmin
        }

        const token = this.jwtService.sign(userPayload)

        return {message: 'Usuario logueado satisfactoriamente', token}
    }
}