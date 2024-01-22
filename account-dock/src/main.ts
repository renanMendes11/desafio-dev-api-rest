import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Desafio api conta digital Dock')
    .setDescription('API de gerenciamento de conta digital Dock')
    .setVersion('1.0')
    .addTag('Titular da conta')
    .addTag('Conta digital')
    .addTag('Operações (saque, deposito e extrato)')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
