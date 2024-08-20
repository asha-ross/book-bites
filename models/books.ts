export interface BooksData {
  attributes: string[]
  id: number
  title: string
  author: string
  summary: string
}

export interface FindBook {
  id: number
  title: string
  author: string
  summary: string
  attribute: string
}
