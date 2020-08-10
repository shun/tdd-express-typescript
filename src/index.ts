import { AppServer } from "./server";
import { createConnection } from "typeorm";

async function bootstrap() {
    const server = new AppServer();
    await server.setup();
    await createConnection();
    server.start();
}

bootstrap();
