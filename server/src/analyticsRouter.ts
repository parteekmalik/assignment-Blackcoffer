import express from "express";
import { PrismaClient } from "@prisma/client";
import { getFilter } from "./data/getFilter";
import { NavData } from "./data/NavData";
import { getStatistics } from "./data/getStistics";

const prisma = new PrismaClient();
const router = express.Router();

// Define types
interface QueryParams {
    skip?: string;
    take?: string;
    FilterData?: string;
    [key: string]: any;
}

type FilterType = Record<string, string[] | { gte: number; lte: number }>;

// Populate Filter object
const Stistics: FilterType = {};
getFilter({}, prisma).then((FiterData) => {
    getStatistics(Stistics, prisma, FiterData);
});

router.get("/Filter/:id", async (req, res) => {
    const { id } = req.params;
    res.json(Stistics[id]);
});

export default router;
