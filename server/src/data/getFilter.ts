import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const getFilter = async (Filter: Record<string, string[] | { gte: number; lte: number }>, prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) => {
    const data = await prisma.data.findMany({ select: { sector: true, topic: true, region: true, country: true, pestle: true } });
    Object.keys(data[0]).forEach((key) => (Filter[key] = []));

    data.forEach((i) => {
        if (Array.isArray(Filter.sector) && !Filter.sector.includes(i.sector)) Filter.sector.push(i.sector);
        if (Array.isArray(Filter.topic) && !Filter.topic.includes(i.topic)) Filter.topic.push(i.topic);
        if (Array.isArray(Filter.region) && !Filter.region.includes(i.region)) Filter.region.push(i.region);
        if (Array.isArray(Filter.country) && !Filter.country.includes(i.country)) Filter.country.push(i.country);
        if (Array.isArray(Filter.pestle) && !Filter.pestle.includes(i.pestle)) Filter.pestle.push(i.pestle);
    });

    const data1 = await prisma.data.findMany({ select: { likelihood: true, relevance: true, impact: true, start_year: true, intensity: true, end_year: true } });
    Object.keys(data1[0]).forEach((key) => {
        Filter[key] = { gte: 0, lte: 10000 };
    });
    data1.forEach((i) => {
        if (!Array.isArray(Filter.end_year)) Filter.end_year.gte = Math.max(Filter.end_year.gte, Number(i.end_year));
        if (!Array.isArray(Filter.end_year)) Filter.end_year.lte = Math.min(Filter.end_year.lte, Number(i.end_year));
        if (!Array.isArray(Filter.likelihood)) Filter.likelihood.gte = Math.max(Filter.likelihood.gte, Number(i.likelihood));
        if (!Array.isArray(Filter.likelihood)) Filter.likelihood.lte = Math.min(Filter.likelihood.lte, Number(i.likelihood));
        if (!Array.isArray(Filter.relevance)) Filter.relevance.gte = Math.max(Filter.relevance.gte, Number(i.relevance));
        if (!Array.isArray(Filter.relevance)) Filter.relevance.lte = Math.min(Filter.relevance.lte, Number(i.relevance));
        if (!Array.isArray(Filter.impact)) Filter.impact.gte = Math.max(Filter.impact.gte, Number(i.impact));
        if (!Array.isArray(Filter.impact)) Filter.impact.lte = Math.min(Filter.impact.lte, Number(i.impact));
        if (!Array.isArray(Filter.start_year)) Filter.start_year.gte = Math.max(Filter.start_year.gte, Number(i.start_year));
        if (!Array.isArray(Filter.start_year)) Filter.start_year.lte = Math.min(Filter.start_year.lte, Number(i.start_year));
        if (!Array.isArray(Filter.intensity)) Filter.intensity.gte = Math.max(Filter.intensity.gte, Number(i.intensity));
        if (!Array.isArray(Filter.intensity)) Filter.intensity.lte = Math.min(Filter.intensity.lte, Number(i.intensity));
    });
};
