import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activer CORS
  app.enableCors({
    origin: 'http://localhost:5173', // L'URL de votre frontend React (ajustez le port si différent)
    // ou origin: true, pour autoriser toutes les origines (moins sécurisé, ok pour le dev local)
    // ou origin: ['http://localhost:5173', 'https://votre-domaine.com'] pour plusieurs origines
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
