import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { todoRouter } from "./routes/todo";
const app = new Hono();

app.route("/api/v1/user", userRouter);
app.route("/api/v1/todo", todoRouter);
export default app;
