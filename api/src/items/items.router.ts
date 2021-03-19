/**
 * Required External Modules and Interfaces
 */

 import express, { Request, Response } from "express";

 /**
 * Router Definition
 */

export const itemsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET

itemsRouter.get("/", async (req: Request, res: Response) => {
    res.status(200).send("It's working!")
  });