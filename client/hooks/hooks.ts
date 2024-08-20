import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import { BooksData, FindBook } from '../../models/books'

export function useBooks() {
  return useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const data = await request.get('/api/v1/books')
      return data.body as BooksData[]
    },
  })
}

export function useAddBook() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newBook: Omit<BooksData, 'id'>) => {
      try {
        const response = await request.post('/api/v1/books').send(newBook)
        return response.body
      } catch (error) {
        console.error('Error in addBook mutation:', error)
        if (error instanceof Error) {
          throw new Error(`Failed to add book: ${error.message}`)
        }
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
    },
  })
}

export function useDeleteBook() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (bookId: number) => {
      await request.delete(`/api/v1/books/${bookId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
    },
  })
}

export function useUpdateBook() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      id,
      updatedBook,
    }: {
      id: number
      updatedBook: Partial<BooksData>
    }) => {
      const response = await request
        .put(`/api/v1/books/${id}`)
        .send(updatedBook)
      return response.body
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
    },
  })
}

export function useFindBooks(attribute: string, value: string) {
  return useQuery({
    queryKey: ['findbooks', attribute, value],
    queryFn: async () => {
      if (!attribute || !value) {
        return []
      }
      const response = await request
        .get('/api/v1/findbooks')
        .query({ attribute, value })
      return response.body as FindBook[]
    },
    enabled: !!attribute && !!value,
  })
}

export async function fetchBookCover(
  title: string,
  author: string,
): Promise<string | null> {
  try {
    const response = await request
      .get('https://openlibrary.org/search.json')
      .query({ title: title, author: author })

    const data = response.body
    if (data.docs && data.docs.length > 0 && data.docs[0].cover_i) {
      return `https://covers.openlibrary.org/b/id/${data.docs[0].cover_i}-M.jpg`
    }
    return null
  } catch (error) {
    console.error('Error fetching book cover:', error)
    return null
  }
}

export function useBookCover(title: string, author: string) {
  return useQuery({
    queryKey: ['bookCover', title, author],
    queryFn: () => fetchBookCover(title, author),
    staleTime: Infinity,
  })
}
