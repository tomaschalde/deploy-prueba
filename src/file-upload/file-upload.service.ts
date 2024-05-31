import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {

    constructor(
                    private readonly fileUploadRepository : FileUploadRepository,
                    @InjectRepository(Products) private readonly productsRepository : Repository<Products>
               ) {}

    async uploadImage(id : string, file : Express.Multer.File){

        const product = await this.productsRepository.findOneBy({ id });
        if(!product) throw new NotFoundException(`No se encontró el producto con id ${id}`)

        const {secure_url} = await this.fileUploadRepository.uploadImage(file);

        await this.productsRepository.update(id, {imgUrl: secure_url})

        const updatedProduct = await this.productsRepository.findOneBy({id})
        return updatedProduct;

    }
}
