import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "src/entities/categories.entity";
import { Repository } from "typeorm";
import * as data from "../utils/data.json"

@Injectable()
export class CategoriesRepository {
    constructor(@InjectRepository(Categories) private categoriesRepository : Repository<Categories>) {}

    async getCategories(){
        return await this.categoriesRepository.find(); 
    }

    async addCategories(){
        const categories = await this.categoriesRepository.find();
        if(categories.length){
            console.log('No se realizó la precarga de datos debido a que ya hay categorias cargadas al sistema')
            throw new NotFoundException('Ya hay categorias cargadas al sistema')
        }
            
         
        data?.map(async (element) => { 
            await this.categoriesRepository
                      .createQueryBuilder() 
                      .insert() 
                      .into(Categories) 
                      .values({name : element.category}) 
                      .orIgnore() 
                      .execute() 
        })

        console.log('Categorias agregadas exitosamente')
        return 'Categorias agregadas exitosamente';
    }

}