import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { Users } from "src/entities/users.entity";


@Injectable()
export class UsersService{
    constructor(private readonly userRepository: UsersRepository){}

    getUsers(page : number, limit : number){
        return this.userRepository.getUsers(page, limit);
    }

    getUserById(id : string) {
        return this.userRepository.getUserById(id);
    }

    createUser(user : Partial<Users>) {
        return this.userRepository.createUser(user)
    }

    updateUser(id : string, user : Partial<Users>) {
        return this.userRepository.updateUser(id,user);
    }

    deleteUser(id : string) {
        return this.userRepository.deleteUser(id)
    }

    getUserByEmail(email : string) {
        return this.userRepository.getUserByEmail(email)
    }
}