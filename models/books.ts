export interface BooksData {
  attribute: string
  id: number
  title: string
  author: string
  summary: string
  cover_url: string | null
}

export interface FindBook {
  id: number
  title: string
  author: string
  summary: string
  attribute: string
  cover_url: string | null
}
