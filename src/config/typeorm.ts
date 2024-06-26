import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";
dotenvConfig({ path: '.development.env' })


const config = {
    type: 'postgres',
    database:process.env.DB_NAME, 
    // host: "postgresdb", esta es la bd local
    host:process.env.DB_HOST, //esta ahora es la DB renderizada
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    synchronize: false,
    dropSchema: false,
    logging: true,
};

export  default registerAs ('typeorm', () => config);
export const conecctionSource = new DataSource(config  as DataSourceOptions)