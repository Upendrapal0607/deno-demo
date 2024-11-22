import { Connection } from "./database/mongo.ts";
import { Application } from "./deps.ts";
import router from "./routes/route.ts";

const app = new Application();
const port = 8000;
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server is running on http://localhost:${port}/`);
Connection();
await app.listen({ port });
