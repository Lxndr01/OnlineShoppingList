import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

type User = {
  username: string;
  password: string;
  email: string;
};

export const POST = async ({ request }: { request: Request }) => {
  try {
    const user = (await request.json()) as User;
    const registeredUser = await prisma.user.findFirst({
      where: {
        username: user.email,
        OR: {
          username: user.username,
        },
      },
    });

    if (registeredUser && bcrypt.compareSync(user.password, registeredUser.password)) {
      return new Response(JSON.stringify({ message: 'Sikeres bejelentkezés!' }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: 'Hibás felhasználónév vagy jelszó!' }), { status: 401 });
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: 'Hiba történt!' }), { status: 500 });
  }
};