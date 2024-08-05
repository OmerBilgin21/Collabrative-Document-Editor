// external
import express, { Request, Response } from "express";

// interfaces
import { IDoc } from "../schemas/doc.js";

// utils
import db from "../schemas/db.js";


const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  const foundDocs = await db.select("*").from<IDoc>('docs')
  res.json(foundDocs)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) return res.status(400).json({ error: "Missing params!" })

  const foundDoc = await db.select("*").from<IDoc>("docs").where("id", id)

  if (foundDoc.length === 0)
    return res.status(404).json({ error: "Not found!" })

  res.json(foundDoc[0])
})

router.post("/create", async (req: Request, res: Response) => {
  const { title, text, name } = req.body

  if (!title || !text || !name) return res.status(400).json({ error: "Missing body!" })

  const foundDocs = await db.select("*").from<IDoc>("docs").where("title", title)

  if (foundDocs.length !== 0) {
    return res.status(400).json({ error: "Document already exists!" })
  }

  const createdDoc = await db<IDoc>("docs").insert({ title, text, name }, "*")

  res.json(createdDoc)
})

export default router;
