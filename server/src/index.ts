import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

const app = express();

const port = 3000;

app.get("/all", async (req, res) => {
    res.json(await prisma.data.findMany());
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
