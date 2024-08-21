import connection from './connection'
import { FindBook, BooksData } from '../../models/books'
import { FindBookCover } from '../../client/hooks/hooks'

const db = connection

export function getAllBooks() {
  return db('books').select()
}

export async function addBook(book: Omit<BooksData, 'id'>): Promise<number[]> {
  try {
    const coverUrl = await FindBookCover(book.title, book.author)
    const result = await db('books').insert({
      title: book.title,
      author: book.author,
      summary: book.summary,
      attribute: book.attribute,
      cover_url: coverUrl,
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
