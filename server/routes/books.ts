import express from 'express'
import { getAllBooks } from '../db/db.ts'
import * as db from '../db/db.ts'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const books = await getAllBooks()
    res.json(books)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong getting the books' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { title, author, summary } = req.body
    const newBook = await db.addBook({ title, author, summary })
    res.status(201).json(newBook)
  } catch (error) {
    res.status(500).json({ message: 'Failed to add your new book' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    await db.deleteBook(id)
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ message: 'Failed to delete your book from collection' })
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { title, author, summary } = req.body
  try {
    await db.updateBook(Number(id), { title, author, summary })
    res.sendStatus(200)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error updating book' })
  }
})

export default router

//This doesn't work yet -- problem solve.

// router.get('/find', async (req, res) => {
//   try {
//     const { attributes } = req.query
//     if (!attributes) {
//       return res.status(400).json({ message: 'Attributes are required' })
//     }
//     const attributeList = Array.isArray(attributes)
//       ? attributes
//       : [attributes as string]
//     const books = await db.findBook(attributeList)
//     res.json(books)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Error finding books by attributes' })
//   }
// })
