import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";
import { Categories } from "src/entities/categories.entity";
import { CategoriesRepository } from "./categories.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Categories])],
    controllers: [CategoriesController],
    providers: [CategoriesService, CategoriesRepository],
})

export class CategoriesModule {}