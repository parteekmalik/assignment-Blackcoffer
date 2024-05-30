import express from "express";
import { PrismaClient } from "@prisma/client";
import { getFilter } from "./data/getFilter";
import { NavData } from "./data/NavData";

const prisma = new PrismaClient();
const router = express.Router();

export default router;
