import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { Products } from "src/entities/products.entity";


@Injectable()
export class ProductsService{
    constructor(private readonly productsRepository : ProductsRepository){}

    getProducts(page : number, limit : number){
        return this.productsRepository.getProducts(page, limit);
    }

    getProductById(id : string) {
        return this.productsRepository.getProductById(id);
    }

    addProducts(){
        return this.productsRepository.addProducts()
    }

    addProduct(name : string, description : string , price : number, stock : number, category : string, imgUrl : string) {
        return this.productsRepository.addProduct(name,description,price,stock,category,imgUrl)
    }

    updateProduct(id : string, product : Partial<Products>) {
        return this.productsRepository.updateProduct(id, product);
    }

    deleteProduct(id : string) {
        return this.productsRepository.deleteProduct(id)
    }

}