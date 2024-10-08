import { Hono } from "hono";
import { loginSchema, signupSchema } from "../schema/userSchema";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRETKEY: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const validate = signupSchema.safeParse(body);

  if (!validate.success) {
    c.status(400);
    return c.json({ msg: "Incorrect inputs" });
  }

  try {
    const user1 = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });

    const token = await sign({ id: user1.id }, c.env.JWT_SECRETKEY);
    return c.json({ token });
  } catch (e) {
    c.status(500);
    return c.json({ msg: "Internal servor error" });
  }
});

userRouter.post("/login", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const validate = loginSchema.safeParse(body);

  if (!validate.success) {
    c.status(400);
    return c.json({ msg: "Incorrect inputs" });
  }

  try {
    const user1 = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user1) {
      c.status(400);
      return c.json({ msg: "user does not exist" });
    }

    const token = await sign({ id: user1.id }, c.env.JWT_SECRETKEY);
    return c.json({ token });
  } catch (e) {
    c.status(500);
    console.log(e);

    return c.json({ msg: "internal server error" });
  }
});

export { userRouter };
