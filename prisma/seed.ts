import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

console.log('testdddd');

async function main() {
  // Optional: delete existing data
  await prisma.user.deleteMany();

  // Insert sample users
  await prisma.user.createMany({
    data: [
      { name: 'Alice', email: 'alice@example.com' },
      { name: 'Bob', email: 'bob@example.com' },
    ],
  });

  console.log('✅ Seed data inserted successfully');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });