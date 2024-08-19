import { useBooks } from '../hooks/hooks'
import '../styles/index.css'
import { BookUpdate } from './BookUpdate'

export default function BooksList() {
  const { data: books, isPending, error } = useBooks()

  if (isPending) return <div>Loading...</div>
  if (error) return <div>Error with Book List: {error.message}</div>

  return (
    <div className="book-grid">
      {books?.map((book) => <BookUpdate key={book.id} book={book} />)}
    </div>
  )
}
