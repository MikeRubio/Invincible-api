import express from "express";
import { CharacterStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "error"],
});

const charactersRouter = express.Router();

charactersRouter.get("/", async (req, res) => {
  try {
    const characters = await prisma.character.findMany();
    res.json(characters);
  } catch (error) {
    console.error("Error fetching characters:", error);
    res.status(500).json({
      errorCode: "INTERNAL_ERROR",
      errorMessage: "An internal error occurred while fetching characters.",
    });
  }
});

charactersRouter.get("/:status", async (req, res) => {
  const { status } = req.params;

  try {
    const characters = await prisma.character.findMany({
      where: {
        status: {
          equals: status.toUpperCase() as CharacterStatus,
        },
      },
    });
    res.json(characters);
  } catch (error) {
    console.error("Error fetching characters:", error);
    res.status(500).json({
      errorCode: "INTERNAL_ERROR",
      errorMessage: "An internal error occurred while fetching characters.",
    });
  }
});

export default charactersRouter;
