import { PrismaClient } from "@prisma/client";
import { promises as fs } from "fs";
import path from "path";
// import { formatISO, parse } from "date-fns";

const prisma = new PrismaClient();

async function readJsonFile(filePath: string) {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        const jsonData = JSON.parse(data);
        return jsonData.map((i: any) => {
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
        }) as DataObject[];
    } catch (error) {
        console.error("Error reading JSON file:", error);
    }
}
type DataObject = {
    end_year: string;
    intensity: string;
    sector: string;
    topic: string;
    insight: string;
    url: string;
    region: string;
    start_year: string;
    impact: string;
    added: string;
    published: string;
    country: string;
    relevance: string;
    pestle: string;
    source: string;
    title: string;
    likelihood: string;
};
const filePath = path.resolve("public/jsondata.json"); // Adjust the path to your JSON file
readJsonFile(filePath).then(async (jsonData) => {
    // Use jsonData here
    if (jsonData) {
        console.log("create populating ...");
        // console.log("JSON Data:",jsonData.forEach(i=>console.log(i.added)));
        const res = await prisma.data.createMany({ data: jsonData });
        // const res = await prisma.data.createMany({ data: {} });
        console.log("finished ->", res);
    }
});
