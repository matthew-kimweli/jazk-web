
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

  let p = process.env.PORT || port
  await app.listen(p);
  console.log(`running and listening on port ${p}`)

}
bootstrap();
