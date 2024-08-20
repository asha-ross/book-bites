import connection from './connection'
import { FindBook, BooksData } from '../../models/books'

const db = connection

export function getAllBooks() {
  return db('books').select()
}

export async function addBook(book: Omit<BooksData, 'id'>): Promise<number[]> {
  try {
    const result = await db('books').insert({
      title: book.title,
      author: book.author,
      summary: book.summary,
      attribute: book.attribute,
    })
    return result
  } catch (error) {
    console.error('Error in addBook function:', error)
    throw error
  }
}

export function deleteBook(id: number): Promise<number> {
  return db('books').where({ id }).del()
}

export function updateBook(
  id: number,
  book: Partial<FindBook>,
): Promise<number> {
  return db('books').where('id', id).update(book)
}

export async function findBook(
  attribute: string,
  value: string,
): Promise<FindBook[]> {
  return db('findbooks')
    .where(attribute, value)
    .select('id', 'title', 'author', 'summary', 'attribute')
}
