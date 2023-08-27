import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  app.setGlobalPrefix('api');
  // app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Budget Api')
    .setDescription('The budget API description')
    .setVersion('1.0')
    .addTag('budget')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
}
bootstrap();
