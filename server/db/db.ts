import connection from './connection'
import { FindBook, BooksData } from '../../models/books'

const db = connection

export function getAllBooks() {
  return db('books').select()
}

export async function addBook(book: Omit<BooksData, 'id'>): Promise<number[]> {
  return db('books').insert(book)
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

//find new book based on attributes
// export async function findBook(attribute: string): Promise<FindBook[]> {
//   return db('books')
//     .whereRaw('? = ANY(attribute)', attribute)
//     .select('title', 'author', 'summary')
// }
