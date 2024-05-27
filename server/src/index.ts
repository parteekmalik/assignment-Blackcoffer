import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import { getFilter } from "./data/getFilter";
import { NavData } from "./data/NavData";

const prisma = new PrismaClient();

const app = express();

const port = 3000;

app.use(cors());

const Filter: Record<string, string[] | { gte: number; lte: number }> = {};

getFilter(Filter, prisma);

app.get("/api", async (req, res) => {
    const skip = parseInt(req.query.skip as string, 10) || 0; // Default to 0 if not provided
    const take = parseInt(req.query.take as string, 10) || 10; // Default to 10 if not provided
    const FilterData = req.query.FilterData === "true" ? true : false; // Default to 10 if not provided

    const data = await prisma.data.findMany({ skip, take });
    console.log("req recieved", data.length, Filter);
    res.json(FilterData ? { data, FilterData: Filter } : { data });
});
app.get("/api/getNavData", async (req, res) => {
    res.json(NavData);
});
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
