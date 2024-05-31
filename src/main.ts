import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerGlobalMiddleware } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(LoggerGlobalMiddleware)
  app.useGlobalPipes(new ValidationPipe());
  const swaggerConfig = new DocumentBuilder()
                                            .setTitle('Ecommerce - M4')
                                            .setDescription('Api creada para el proyecto de Ecommerce')
                                            .setVersion('1.0')
                                            .addBearerAuth()
                                            .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}
bootstrap();
