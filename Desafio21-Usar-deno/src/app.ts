import { Application } from "../deps.ts";
import { router } from "./router/index.ts"
import { notFound } from "./handler/index.ts";

const app = new Application();

app.use(router.routes());

app.use(router.allowedMethods())
    .use(notFound);

console.log("Server listening on http://localhost:8080");

await app.listen({ port: 8080 });