import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const getFilter = async (Filter: Record<string, string[] | { gte: number; lte: number }>, prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) => {
    const data = await prisma.data.findMany({ select: { sector: true, topic: true, region: true, country: true, pestle: true } });
    Object.keys(data[0]).forEach((key) => (Filter[key] = []));

    data.forEach((i) => {
        if (Array.isArray(Filter.sector) && i.sector && !Filter.sector.includes(i.sector) && i.sector !== "unknown") Filter.sector.push(i.sector);
        if (Array.isArray(Filter.topic) && i.topic && !Filter.topic.includes(i.topic) && i.topic !== "unknown") Filter.topic.push(i.topic);
        if (Array.isArray(Filter.region) && i.region && !Filter.region.includes(i.region) && i.region !== "unknown") Filter.region.push(i.region);
        if (Array.isArray(Filter.country) && i.country && !Filter.country.includes(i.country) && i.country !== "unknown") Filter.country.push(i.country);
        if (Array.isArray(Filter.pestle) && i.pestle && !Filter.pestle.includes(i.pestle) && i.pestle !== "unknown") Filter.pestle.push(i.pestle);
    });
    Object.keys(Filter).forEach((key) => {
        const item = Filter[key] as string[];
        Filter[key] = ["unknown", ...item];
    });

    const data1 = await prisma.data.findMany({ select: { likelihood: true, relevance: true, impact: true, start_year: true, intensity: true, end_year: true } });
    Object.keys(data1[0]).forEach((key) => {
        Filter[key] = { gte: 0, lte: 10000 };
    });
    data1.forEach((i) => {
        if (!Array.isArray(Filter.end_year)) Filter.end_year.gte = Math.max(Filter.end_year.gte, Number(i.end_year !== -1 ? i.end_year : Filter.end_year.gte));
        if (!Array.isArray(Filter.end_year)) Filter.end_year.lte = Math.min(Filter.end_year.lte, Number(i.end_year !== -1 ? i.end_year : Filter.end_year.lte));
        if (!Array.isArray(Filter.likelihood)) Filter.likelihood.gte = Math.max(Filter.likelihood.gte, Number(i.likelihood !== -1 ? i.likelihood : Filter.likelihood.gte));
        if (!Array.isArray(Filter.likelihood)) Filter.likelihood.lte = Math.min(Filter.likelihood.lte, Number(i.likelihood !== -1 ? i.likelihood : Filter.likelihood.lte));
        if (!Array.isArray(Filter.relevance)) Filter.relevance.gte = Math.max(Filter.relevance.gte, Number(i.relevance !== -1 ? i.relevance : Filter.relevance.gte));
        if (!Array.isArray(Filter.relevance)) Filter.relevance.lte = Math.min(Filter.relevance.lte, Number(i.relevance !== -1 ? i.relevance : Filter.relevance.lte));
        if (!Array.isArray(Filter.impact)) Filter.impact.gte = Math.max(Filter.impact.gte, Number(i.impact !== -1 ? i.impact : Filter.impact.gte));
        if (!Array.isArray(Filter.impact)) Filter.impact.lte = Math.min(Filter.impact.lte, Number(i.impact !== -1 ? i.impact : Filter.impact.lte));
        if (!Array.isArray(Filter.start_year)) Filter.start_year.gte = Math.max(Filter.start_year.gte, Number(i.start_year !== -1 ? i.start_year : Filter.start_year.gte));
        if (!Array.isArray(Filter.start_year)) Filter.start_year.lte = Math.min(Filter.start_year.lte, Number(i.start_year !== -1 ? i.start_year : Filter.start_year.lte));
        if (!Array.isArray(Filter.intensity)) Filter.intensity.gte = Math.max(Filter.intensity.gte, Number(i.intensity !== -1 ? i.intensity : Filter.intensity.gte));
        if (!Array.isArray(Filter.intensity)) Filter.intensity.lte = Math.min(Filter.intensity.lte, Number(i.intensity !== -1 ? i.intensity : Filter.intensity.lte));
    });
    console.log(Filter);
    return Filter;
};
