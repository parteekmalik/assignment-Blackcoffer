import { PrismaClient, Data } from "@prisma/client";
// import { formatISO, parse } from "date-fns";
import { jsondata } from "./data/jsondata";

const prisma = new PrismaClient();

function readJsonFile() {
    return jsondata.map((i) => {
        return {
            end_year: typeof i.end_year !== "string" ? i.end_year : -1,
            start_year: typeof i.start_year !== "string" ? i.start_year : -1,
            impact: typeof i.impact !== "string" ? i.impact : -1,
            intensity: typeof i.intensity !== "string" ? i.intensity : -1,
            relevance: typeof i.relevance !== "string" ? i.relevance : -1,
            likelihood: typeof i.likelihood !== "string" ? i.likelihood : -1,
            added: i.added !== "" ? i.added : "unknown",
            sector: i.sector !== "" ? i.sector : "unknown",
            source: i.source !== "" ? i.source : "unknown",
            pestle: i.pestle !== "" ? i.pestle : "unknown",
            published: i.published !== "" ? i.published : "unknown",
            url: i.url !== "" ? i.url : "unknown",
            region: i.region !== "" ? i.region : "unknown",
            country: i.country !== "" ? i.country : "unknown",
            title: i.title !== "" ? i.title : "unknown",
            topic: i.topic !== "" ? i.topic : "unknown",
            insight: i.insight !== "" ? i.insight : "unknown",
        } as Omit<Data, "id">;
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
