import { PrismaClient, Data } from "@prisma/client";
// import { formatISO, parse } from "date-fns";
import { jsondata } from "./data/jsondata";

const prisma = new PrismaClient();

function readJsonFile() {
    return jsondata.map((i) => {
        return {
            end_year: typeof i.end_year !== "string" ? i.end_year : null,
            start_year: typeof i.start_year !== "string" ? i.start_year : null,
            impact: typeof i.impact !== "string" ? i.impact : null,
            intensity: typeof i.intensity !== "string" ? i.intensity : null,
            relevance: typeof i.relevance !== "string" ? i.relevance : null,
            likelihood: typeof i.likelihood !== "string" ? i.likelihood : null,
            added: i.added !== "" ? i.added : null,
            sector: i.sector !== "" ? i.sector : null,
            source: i.source !== "" ? i.source : null,
            pestle: i.pestle !== "" ? i.pestle : null,
            published: i.published !== "" ? i.published : null,
            url: i.url !== "" ? i.url : null,
            region: i.region !== "" ? i.region : null,
            country: i.country !== "" ? i.country : null,
            title: i.title !== "" ? i.title : null,
            topic: i.topic !== "" ? i.topic : null,
            insight: i.insight !== "" ? i.insight : null,
        } as Omit<Data, 'id'>;
    });
}

async function populating() {
    console.log("create populating ...");
    // console.log("JSON Data:",jsonData.forEach(i=>console.log(i.added)));
    const res = await prisma.data.createMany({ data: readJsonFile() });
    // const res = await prisma.data.createMany({ data: {} });
    console.log("finished ->", res);
}
populating();
