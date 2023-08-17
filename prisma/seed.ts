/* eslint-disable prettier/prettier */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  const user1 = await prisma.usuario.upsert({
    where: { email: 'murilo.a.dev@gmail.com' },

    update: {},

    create: {
      firstName: 'Murilo',

      lastName: 'Amurim',

      email: 'murilo.a.dev@gmail.com',

    },
  });

  const user2 = await prisma.usuario.upsert({
    where: { email: 'teste.a.dev@gmail.com' },

    update: {},

    create: {
      firstName: 'Teste',

      lastName: 'Tester',

      email: 'teste.a.dev@gmail.com',

    },
  });

  console.log({ user1, user2 });
}

main()
  .catch((e) => {
    console.error(e);

    process.exit(1);
  })

  .finally(async () => {
    // close Prisma Client at the end

    await prisma.$disconnect();
  });
