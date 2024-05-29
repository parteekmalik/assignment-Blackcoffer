import { PrismaClient } from "@prisma/client";
import express from "express";
import { getFilter } from "./data/getFilter";
import { NavData } from "./data/NavData";

const prisma = new PrismaClient();
const router = express.Router();

const Filter: Record<string, string[] | { gte: number; lte: number }> = {};

getFilter(Filter, prisma);

router.get("/api", async (req, res) => {
    const { skip: S, take: T, FilterData: F, ...rest } = req.query;
    const skip = parseInt(S as string, 10) || 0; // Default to 0 if not provided
    const take = parseInt(T as string, 10) || 10; // Default to 10 if not provided
    const FilterData = F === "true" ? true : false; // Default to 10 if not provided

    try {
        const data = await prisma.data.findMany({ skip, take, ...rest });
        console.log("req received", data.length, Filter);
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
