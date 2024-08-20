import express from 'express'
import * as db from '../db/db.ts'

const findbooksRouter = express.Router()

findbooksRouter.get('/api/v1/findbooks', async (req, res) => {
  try {
    const { attribute, value } = req.query

    if (!attribute || !value) {
      return res
        .status(400)
        .json({ error: 'Both attribute and value are required' })
    }

    const books = await db.findBook(attribute as string, value as string)
    res.json(books)
  } catch (error) {
    console.error('Error in findbooks route:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default findbooksRouter
