import { Hono } from "hono";
import { todoSchema } from "../schema/todoSchema";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

const todoRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRETKEY: string;
  };
  Variables: {
    userId: string;
  };
}>();

todoRouter.use("/*", async (c, next) => {
  const header = await c.req.header("Authorization");
  if (!header) {
    c.status(400);
    return c.json({ msg: "Token not provided" });
  }
  const token = header?.split(" ")[1];

  if (!token) {
    c.status(400);
    return c.json({ msg: "Token not provided" });
  }

  try {
    const decoded = await verify(token, c.env.JWT_SECRETKEY);
    c.set("userId", decoded.id as string);
    await next();
  } catch (e) {
    c.status(403);
    return c.json({ msg: "Not logged in" });
  }
});

todoRouter.post("/", async (c) => {
  const body = await c.req.json();
  const userId = c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const validate = todoSchema.safeParse(body);

  if (!validate.success) {
    c.status(400);
    return c.json({ msg: "Incorrect inputs" });
  }
  try {
    const todo1 = await prisma.todos.create({
      data: {
        title: body.title,
        description: body.description,
        authorId: Number(userId),
      },
    });
    c.status(200);
    return c.json({ msg: "todo created", id: todo1.id });
  } catch (e) {
    c.status(403);
    return c.json({ msg: "Error" });
  }
});

todoRouter.get("/bulk", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const todos = await prisma.todos.findMany({
      where: {
        authorId: Number(userId),
      },
    });
    if (todos.length === 0) {
      c.status(200);
      return c.json({ msg: "You have not created any todos" });
    }
    c.status(200);
    return c.json(todos);
  } catch (e) {
    c.status(500);
    return c.json({ msg: "Error" });
  }
});

todoRouter.get("/:id", async (c) => {
  const id = await c.req.param("id");
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const todos = await prisma.todos.findFirst({
      where: {
        id: Number(id),
        authorId: Number(userId),
      },
    });
    if (!todos) {
      c.status(200);
      return c.json({ msg: "You have not created any todos mm" });
    }
    return c.json({ todos });
  } catch (e) {
    c.status(500);
    return c.json({ msg: "error" });
  }
});

todoRouter.put("/:id", async (c) => {
  const id = await c.req.param("id");
  const userId = await c.get("userId");
  const body = await c.req.json();

  const validate = todoSchema.safeParse(body);
  if (!validate.success) {
    c.status(400);
    return c.json({ msg: "Incorrect Inputs" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    await prisma.todos.update({
      where: {
        id: Number(id),
      },
      data: {
        title: body.title,
        description: body.description,
      },
    });

    c.status(200);
    return c.json({ msg: "Todo updated" });
  } catch (e) {
    c.status(500);
    return c.json({ msg: "Internal server error" });
  }
});

todoRouter.delete("/:id", async (c) => {
  const id = await c.req.param("id");
  const userId = await c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    await prisma.todos.delete({
      where: {
        id: Number(id),
        authorId: Number(userId),
      },
    });

    return c.json({ msg: "Todo deleted" });
  } catch (e) {
    c.status(500);
    return c.json({ msg: "Internal server error" });
  }
});

export { todoRouter };
