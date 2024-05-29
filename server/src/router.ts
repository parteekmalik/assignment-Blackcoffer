import { PrismaClient, Data as DataTypePrisma } from "@prisma/client";
import express from "express";
import { getFilter } from "./data/getFilter";
import { NavData } from "./data/NavData";

const prisma = new PrismaClient();
const router = express.Router();

const Filter: Record<string, string[] | { gte: number; lte: number }> = {};

getFilter(Filter, prisma);

// Define a type for query parameters
interface QueryParams {
    skip?: string;
    take?: string;
    FilterData?: string;
    [key: string]: any;
}
type FilterType = {
    [key: string]:
        | string[]
        | {
              isNullIncluded: boolean;
              gte: number;
              lte: number;
          };
};

router.get("/api", async (req, res) => {
    const { skip: S, take: T, FilterData: F, ...rest } = req.query as QueryParams;
    const skip = parseInt(S as string, 10) || 0; // Default to 0 if not provided
    const take = parseInt(T as string, 10) || 10; // Default to 10 if not provided
    const FilterData = F === "true"; // Only true if F is exactly "true"
    try {
        // Parsing additional query parameters to JSON if needed
        const queryParams: FilterType = Object.keys(rest).reduce((acc: Record<string, any>, key) => {
            acc[key] = JSON.parse(rest[key] as string);
            return acc;
        }, {});
        const ArrayQueryParams = Object.fromEntries(
            Object.entries(queryParams)
                .filter(([_, value]) => Array.isArray(value))
                .map(([key, value]) => [key, { in: value }])
        ) as { [k: string]: { in: string[] } };

        const ObjQueryParams = Object.fromEntries(Object.entries(queryParams).filter(([_, value]) => !Array.isArray(value)) as [string, { isNullIncluded: boolean; gte: number; lte: number }][]);

        console.log({ skip, take, where: { ...ArrayQueryParams }, ObjQueryParams });
        const data = await prisma.data.findMany({ skip, take, where: { ...ArrayQueryParams } }); // to add ...ObjQueryParams modify
        // console.log("req received", data.length, Filter);
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
