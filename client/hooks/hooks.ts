import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import { BooksData } from '../../models/books'

export function useBooks() {
  return useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const data = await request.get('/api/v1/books')
      return data.body as BooksData[]
    },
  })
}

//This doesn't work yet
// export function useFindBooks({ enabled }: { enabled: boolean }) {
//   return useQuery({
//     queryKey: ['findbooks'],
//     queryFn: async () => {
//       const data = await request.get('/api/v1/findbooks')
//       return data.body as FindBook[]
//     },
//     enabled: enabled,
//   })
// }

export function useAddBook() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newBook: Omit<BooksData, 'id'>) => {
      const response = await request.post('/api/v1/books').send(newBook)
      return response.body
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
