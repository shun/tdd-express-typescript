import { AppServer } from "./server";

function bootstrap() {
    const server = new AppServer();
    server.start();
}

bootstrap();
