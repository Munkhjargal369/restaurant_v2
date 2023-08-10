import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Add data to the Category table
    const category = await prisma.category.create({
      data: {
        name: 'Electronics',
      },
    });

    console.log('Category added:', category);
  } catch (error) {
    console.error('Error adding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
