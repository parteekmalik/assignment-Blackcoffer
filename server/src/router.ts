import express from "express";
import { PrismaClient } from "@prisma/client";
import { getFilter } from "./data/getFilter";
import { NavData } from "./data/NavData";

const prisma = new PrismaClient();
const router = express.Router();

// Define types
interface QueryParams {
    skip?: string;
    take?: string;
    FilterData?: string;
    [key: string]: any;
}

type FilterType = Record<string, string[] | { isNullIncluded: boolean; gte: number; lte: number }>;

// Populate Filter object
const Filter: FilterType = {};

getFilter(Filter, prisma);

router.get("/api", async (req, res) => {
    const { skip: skipStr, take: takeStr, FilterData: FilterDataStr, ...rest } = req.query as QueryParams;

    const skip = parseInt(skipStr || "0", 10);
    const take = parseInt(takeStr || "10", 10);
    const FilterData = FilterDataStr === "true";

    try {
        // Parse additional query parameters
        const queryParams: FilterType = Object.fromEntries(
            Object.entries(rest).map(([key, value]) => {
                try {
                    const parsedValue = JSON.parse(value as string);
                    return [key, parsedValue];
                } catch {
                    return [key, value];
                }
            })
        );

        const ArrayQueryParams = Object.fromEntries(
            Object.entries(queryParams)
                .filter(([_, value]) => Array.isArray(value) && value.length)
                .map(([key, value]) => [key, { in: value as string[] }])
        );

        const ObjQueryParams: any[] = []; // Define ObjQueryParams as an object

        Object.entries(queryParams)
            .filter(([_, value]) => typeof value === "object" && "isNullIncluded" in value)
            .forEach(([key, value]) => {
                const { isNullIncluded, gte, lte } = value as { isNullIncluded: boolean; gte: number; lte: number };

                // Construct conditions based on isNullIncluded
                const temp: any = {};
                temp[key] = { lte: Number(gte), gte: Number(lte) };

                if (isNullIncluded) {
                    // Assign conditions to ObjQueryParams with dynamic key
                    const temp2: any = {};
                    temp2[key] = { equals: -1 };
                    ObjQueryParams.push({ OR: [temp, temp2] });
                    return;
                }
                ObjQueryParams.push({ OR: [temp] });
            });

        console.log(queryParams, JSON.stringify(ObjQueryParams));
        const where = { ...ArrayQueryParams, AND: ObjQueryParams };
        console.log({ skip, take, where });

        const data = await prisma.data.findMany({ skip, take, where });

        res.status(200).json(FilterData ? { data, FilterData: Filter } : { data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/api/getNavData", async (req, res) => {
    res.json(NavData);
});

router.get("/ping", async (req, res) => {
    res.status(200).send("hi");
});

export default router;
