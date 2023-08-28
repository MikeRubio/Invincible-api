import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "error"],
});

const characterRouter = express.Router();

characterRouter.get("/:alias", async (req, res) => {
  const { alias } = req.params;

  try {
    const character = await prisma.character.findUnique({
      where: { alias: alias },
    });

    if (!character) {
      res.status(404).json({
        errorCode: "NOT_FOUND",
        errorMessage: "Character not found.",
      });
    } else {
      res.json(character);
    }
  } catch (error) {
    console.error("Error fetching character:", error);
    res.status(500).json({
      errorCode: "INTERNAL_ERROR",
      errorMessage: "An internal error occurred while fetching the character.",
    });
  }
});

export default characterRouter;
