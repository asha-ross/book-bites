import express from 'express'
import { getAllBooks } from '../db/db.ts'
import * as db from '../db/db.ts'

const booksRouter = express.Router()

booksRouter.get('/', async (req, res) => {
  try {
    const books = await getAllBooks()
    res.json(books)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Something went wrong getting the books' })
  }
})

booksRouter.post('/', async (req, res) => {
  try {
    const { title, author, summary, attribute } = req.body
    const newBook = await db.addBook({ title, author, summary, attribute })
    res.status(201).json(newBook)
  } catch (error) {
    res.status(500).json({ message: 'Failed to add your new book' })
  }
})

booksRouter.delete('/:id', async (req, res) => {
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

booksRouter.put('/:id', async (req, res) => {
  const { id } = req.params
  const { title, author, summary, attribute } = req.body
  try {
    await db.updateBook(Number(id), { title, author, summary, attribute })
    res.sendStatus(200)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error updating book' })
  }
})

export default booksRouter
