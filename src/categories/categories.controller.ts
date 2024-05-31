import {Controller, Get, UseGuards} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/roles/role.enum";
import { RolesGuard } from "src/auth/guards/roles.guard";

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController{

    constructor(private readonly categoriesService : CategoriesService) {}
    
    @Get()
    getCategories(){
        return this.categoriesService.getCategories();
    }

    @ApiBearerAuth()
    @Get('seeder')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    addCategories(){
        return this.categoriesService.addCategories()
    }

}