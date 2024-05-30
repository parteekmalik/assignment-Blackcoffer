import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const getStatistics = async (
    Filter: Record<string, any>,
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    FilterData: Record<
        string,
        | string[]
        | {
              gte: number;
              lte: number;
          }
    >
) => {
    // Fetch the data from the database
    const data = await prisma.data.findMany({
        select: {
            sector: true,
            topic: true,
            region: true,
            country: true,
            pestle: true,
        },
    });

    // Process each key in FilterData
    for (const key of Object.keys(FilterData)) {
        const item = FilterData[key];
        if (item && Array.isArray(item)) {
            // Await inside map using Promise.all
            const temp = await Promise.all(
                item
                    .filter((i) => i !== "unknown")
                    .map(async (i) => {
                        const count = await prisma.data.count({
                            where: {
                                [key]: i,
                            },
                        });
                        return { name: i, count };
                    })
            );
            Filter[key] = temp;
        }
    }

    // Further processing can be done here if needed
    // Example: Process each entry in the fetched data
    data.forEach((i) => {
        // Your processing logic here
    });

    // Logging the filter object
    console.log(Filter);
};
