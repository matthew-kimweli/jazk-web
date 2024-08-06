
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = 3012

async function bootstrap() {


  const app = await NestFactory.create(AppModule);


  app.enableCors({
    // preflightContinue: false,
    // methods: "*",
    // optionsSuccessStatus: 200,
    // allowedHeaders: "*",
    origin: "*",
    // credentials: true
  });


  await app.listen(process.env.PORT || port);
  console.log(`running and listening on port ${port}`)

}
bootstrap();
