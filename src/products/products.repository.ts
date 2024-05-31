import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "src/entities/categories.entity";
import { Products } from "src/entities/products.entity";
import { Repository } from "typeorm";
import * as data from "../utils/data.json"


@Injectable()
export class ProductsRepository {

    constructor(
        @InjectRepository(Products) private productsRepository : Repository<Products>,
        @InjectRepository(Categories) private categoriesRepository : Repository <Categories>
    ) {}


    async getProducts(page : number, limit : number) {
        
        let products = await this.productsRepository.find({
            relations: {
                category: true
            }
        });

        const start = (page - 1) * limit
        const end = start + limit
        products = products.slice(start, end);

        return products;
    }

    async getProductById(id : string) {
        const product = await this.productsRepository.findOneBy({ id });

        if(!product) throw new NotFoundException(`No se encontró el producto con id ${id}`)

        return product;
    }

    async addProducts(){
        const products = await this.productsRepository.find();
        if(products.length){
            console.log('No se realizó la precarga de datos debido a que ya hay productos cargadas al sistema')
            throw new NotFoundException('Ya se cargaron productos al sistema')
        } 
        const categories = await this.categoriesRepository.find();

        if(!categories.length) throw new UnprocessableEntityException('Aun no se cargaron categorías al sistema')

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


            await this.productsRepository   
                      .createQueryBuilder() 
                      .insert() 
                      .into(Products) 
                      .values(product) 
                      .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name']) 
                      .execute(); 
        });

        console.log('Productos agregados exitosamente')
        return 'Productos agregados exitosamente'
    }

    async addProduct(name : string, description : string, price : number, stock : number, category : string, imgUrl : string) {

        const categories = await this.categoriesRepository.find();
        if(!categories.length) throw new UnprocessableEntityException('Aun no se cargaron categorías al sistema')

        const categorie = categories.find((categorie) => categorie.name === category)
        if(!categorie) throw new UnprocessableEntityException('No existe la categoria')


        const newProduct = await this.productsRepository.create({name,description,price,stock,imgUrl,category : categorie})
        await this.productsRepository   
        .createQueryBuilder() 
        .insert() 
        .into(Products) 
        .values(newProduct) 
        .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name']) 
        .execute(); 

        return {message: "Producto agregado exitosamente", productId: newProduct.id};
    }

    async updateProduct(id : string, product : Partial<Products>) {

        const foundProduct = await this.productsRepository.findOneBy({ id });
        if(!foundProduct) throw new BadRequestException(`No se encontró el producto con id ${id}`);

        await this.productsRepository.update(id, product); 

        const updatedProduct = await this.productsRepository.findOneBy({id}); 

        return updatedProduct;
    }

    async deleteProduct(id : string) {

        const product = await this.productsRepository.findOneBy({id})

        if(!product) throw new BadRequestException(`No se encontro el product con id ${id}`);

        this.productsRepository.remove(product);
        
        return product;
    }

}