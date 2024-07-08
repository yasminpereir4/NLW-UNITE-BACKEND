import { prisma } from "../src/lib/prisma";

async function seed() {
  await prisma.event.create({
    data: {
      id: "5a1523da-8d63-46a9-84da-155ad1bd19d1",
      title: "Unite summit",
      slug: "unite-summit",
      details: "Um evento p/ devs apaixonados",
      maximumAttendes: 120,
    },
  });
}

seed().then(() => {
  console.log("Database seeded!");
  prisma.$disconnect;
});
