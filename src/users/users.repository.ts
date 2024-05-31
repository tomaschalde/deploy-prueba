import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/entities/users.entity";
import { OrdersRepository } from "src/orders/orders.repository";
import { Repository } from "typeorm";

@Injectable()
export class UsersRepository {

    constructor(
                 @InjectRepository(Users) private usersRepository : Repository<Users>,
                 private readonly ordersRepository : OrdersRepository
               ) {}

    async getUsers(page: number, limit : number) {

        const skip = (page - 1) * limit;
        const users = await this.usersRepository.find({ 
            take: limit,
            skip: skip
        })

        return users.map(({password, ...userNoPassword}) => userNoPassword) 
    }

    async getUserById(id : string) {

        const user = await this.usersRepository.findOne({ 
            where: {id},
            relations: {
                orders: true
            }
        });

        if(!user) throw new BadRequestException(`No se encontro el usuario con id ${id}`);

        const {password, isAdmin,...userNoPasswordNoAdmin} = user
        return userNoPasswordNoAdmin; 
    }

    async createUser(user : Partial <Users>) {
        
        const newUser = await this.usersRepository.save(user);

        const dbUser = await this.usersRepository.findOneBy({id : newUser.id})

        const {password, isAdmin,...userNoPasswordNoAdmin} = dbUser;

        return userNoPasswordNoAdmin
    }

    async updateUser(id : string, user : Partial<Users>) {

        const foundUser = await this.usersRepository.findOneBy({ id });
        if(!foundUser) throw new BadRequestException(`No se encontró el producto con id ${id}`);
        

        await this.usersRepository.update(id,user);
        
        const updatedUser = await this.usersRepository.findOneBy({ id })

        const {password, isAdmin,...userNoPasswordNoAdmin} = updatedUser 

        return userNoPasswordNoAdmin; 
    }

    async deleteUser(id : string) {

        const user = await this.usersRepository.findOne({where:{id : id}, relations: {orders:true}});

        if(!user) throw new BadRequestException(`No se encontro el usuario con id ${id}`);

        const ordersUser = user.orders

        if(ordersUser.length > 0) {
            await Promise.all(ordersUser.map(async (orden) => {await this.ordersRepository.deleteOrder(orden.id)}))
        }
        
        await this.usersRepository.remove(user);

        const {password, isAdmin,...userNoPasswordNoAdmin} = user 

        return userNoPasswordNoAdmin; 
    }

    async getUserByEmail(email : string) {
        return await this.usersRepository.findOneBy({email}) 
    }
}