import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "src/entities/categories.entity";
import { Products } from "src/entities/products.entity";
import { Repository } from "typeorm";
import * as data from "../utils/data.json"
import * as bcrypt from 'bcrypt'
import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { Users } from "src/entities/users.entity";

@Injectable()
export class preloadData {
    constructor(
                    @InjectRepository(Categories) private readonly categoriesRepository : Repository <Categories>,
                    @InjectRepository(Products) private readonly productsRepository : Repository <Products>,
                    @InjectRepository(Users) private readonly usersRepository : Repository <Users>
               ) {}
    
    async preloadDataCategories () {
        await this.categoriesRepository.manager.transaction(async (transactionalEntityManager) => {
            const categories = await this.categoriesRepository.find();
            if(categories.length){
                return console.log('No se realizó la precarga de datos debido a que ya hay categorias cargadas al sistema')
            }
                
             
            data?.map(async (element) => { 
                await transactionalEntityManager
                          .createQueryBuilder() 
                          .insert() 
                          .into(Categories) 
                          .values({name : element.category}) 
                          .orIgnore() 
                          .execute() 
            })
    
            return console.log('Categorias agregadas exitosamente')

        })
    }

    async preloadDataProducts () {
        await this.productsRepository.manager.transaction(async(transactionalEntityManager) => {

            const products = await this.productsRepository.find();
            if(products.length){
                return console.log('No se realizó la precarga de datos debido a que ya hay productos cargadas al sistema')
            } 
            const categories = await this.categoriesRepository.find();
    
            if(!categories.length) return console.log('Aun no se cargaron categorías al sistema')
    
            data?.map(async (element) => {
    
                const category = categories.find((category) => category.name === element.category)
                if(!category) throw new UnprocessableEntityException('No existe la categoria')
    
    
                const product = new Products()
                product.name = element.name
                product.description = element.description
                product.price = element.price
                product.stock = element.stock
                product.imgUrl = element.imgUrl
                product.category = category;
    
    
                await transactionalEntityManager
                          .createQueryBuilder() 
                          .insert() 
                          .into(Products) 
                          .values(product) 
                          .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name']) 
                          .execute(); 
            });
    
            return console.log('Productos agregados exitosamente')

        })


    }

    async preloadAdmin() {
        await this.usersRepository.manager.transaction(async(transactionalEntityManager) => {
            const users = await this.usersRepository.find()

            if(users.length) return console.log('No se realizo la precarga del administrador porque ya existe uno')

            const user = new Users()
            user.name = "Admin"
            user.email = "admin@gmail.com"
            user.password = await bcrypt.hash("Admin123!", 10)
            user.phone = 11223344,
            user.address = "Calle 123"
            user.country = "Argentina"
            user.city = "Buenos Aires"
            user.isAdmin = true;

            await transactionalEntityManager
                    .createQueryBuilder()
                    .insert()
                    .into(Users)
                    .values(user)
                    .execute();
            
            return console.log('Administrador precargado con exito')
        })
    }
}