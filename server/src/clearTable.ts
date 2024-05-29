import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearTableData() {
  try {
    // Replace `ModelName` with the name of your Prisma model
    const deletedItems = await prisma.data.deleteMany({});
    console.log(`Deleted ${deletedItems.count} items from the table.`);
  } catch (error) {
    console.error('Error clearing table data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

clearTableData();
