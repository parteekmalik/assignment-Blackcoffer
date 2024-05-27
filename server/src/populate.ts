import { PrismaClient } from "@prisma/client";
// import { formatISO, parse } from "date-fns";
import { jsondata } from "./data/jsondata";

const prisma = new PrismaClient();

function readJsonFile() {
    return jsondata.map((i) => {
        return {
            ...i,
            end_year: String(i.end_year),
            start_year: String(i.start_year),
            impact: String(i.impact),
            intensity: String(i.intensity),
            relevance: String(i.relevance),
            likelihood: String(i.likelihood),
            // added: formatISO(parse(i.added, "MMMM, dd yyyy HH:mm:ss", new Date()), { representation: "complete" }),
            // published: formatISO(parse(i.published, "MMMM, dd yyyy HH:mm:ss", new Date()), { representation: "complete" }),
        };
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
