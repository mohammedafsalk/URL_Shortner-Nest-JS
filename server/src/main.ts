import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  // Create a Nest application instance with AppModule as the root module
  const app = await NestFactory.create(AppModule);

  // Enable CORS (Cross-Origin Resource Sharing) to allow requests from a specific origin
  app.enableCors({
    origin: 'http://localhost:5173', // replace with your client URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Use the cookie-parser middleware to handle cookies in the request
  app.use(cookieParser());
  // Start the Nest application on port 4000
  await app.listen(4000);
}
bootstrap();
