import { ArrayNotEmpty, IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { Products } from "src/entities/products.entity";

export class CreateOrderDto {

    /**
     * La propiedad userId debe ser un id existente de tipo uuid
     * @example 550e8400-e29b-41d4-a716-446655440000
     */
    @IsNotEmpty()
    @IsUUID()
    userId: string
    /**
     * La propiedad products debe ser un array de objetos con id de tipo uuid de productos existentes
     * @example [{id:550e8400-e29b-41d4-a716-112233110000},{id:550e8400-e29b-41d4-a716-778899770000}]
     */
    @IsArray()
    @ArrayNotEmpty()
    products: Partial <Products[]>
}