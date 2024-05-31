import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, ParseUUIDPipe, Req } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/roles/role.enum";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateProductDto } from "src/dtos/createProduct.dto";
import { UpdateProductDto } from "src/dtos/updateProduct.dto";


@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productService : ProductsService){}

    //Gets
    @Get()
    getProducts(@Query('page') page : string , @Query('limit') limit : string){

        if(!page && !limit) return this.productService.getProducts(1,5)

        return this.productService.getProducts(Number(page),Number(limit));
    }

    @ApiBearerAuth()
    @Get('/seeder')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard,RolesGuard)
    addProducts(){
        return this.productService.addProducts();
    }

    @Get(':id')
    getProductById(@Param('id', ParseUUIDPipe) id : string){
        return this.productService.getProductById(id)
    }


    //Posts
    @ApiBearerAuth()
    @Post()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    addProduct(@Body() product : CreateProductDto ){
        const {name,description,price,stock,category,imgUrl} = product
        return this.productService.addProduct(name,description,price,stock,category,imgUrl);
    }

    //Puts
    @ApiBearerAuth()
    @Put(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard,RolesGuard)
    updateProduct(@Param('id', ParseUUIDPipe) id : string, @Body() product : UpdateProductDto, @Req() request : Request & {user : any}){
        console.log(request.user)
        return this.productService.updateProduct(id, product)
    }

    //Delete
    @ApiBearerAuth()
    @Delete(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    deleteProduct(@Param('id', ParseUUIDPipe) id : string){
        return this.productService.deleteProduct(id)
    }
}