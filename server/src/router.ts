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

type FilterType = Record<string, { list: string[]; isNullIncluded: boolean; gte: number; lte: number }>;

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
            Object.entries(rest)
                .map(([key, value]) => {
                    const parsedValue = JSON.parse(value as string);
                    return [key, parsedValue];
                })
                .filter(Boolean)
        );

        const ArrayQueryParams = Object.fromEntries(
            Object.entries(queryParams)
                .filter(([_, value]) => Array.isArray(value.list))
                .map(([key, value]) => {
                    const IN = value.list.length ? { in: value.list } : null;
                    const equals = value.isNullIncluded ? { equals: null } : null;
                    return [key, { ...IN, ...equals }];
                })
        );

        const ObjQueryParams = Object.fromEntries(
            Object.entries(queryParams)
                .filter(([_, value]) => "list" in value && !Array.isArray(value.list))
                .map(([key, { isNullIncluded, gte, lte }]) => {
                    const equals = isNullIncluded ? { equals: null } : null;
                    return [key, { gte, lte, ...equals }];
                })
        );

        const where = { ...ArrayQueryParams, ...ObjQueryParams };
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
