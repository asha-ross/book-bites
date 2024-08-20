import { useDeleteBook, useUpdateBook } from '../hooks/hooks'
import { BooksData } from '../../models/books'
import { useEffect, useState } from 'react'
import { useBookCover } from '../hooks/hooks'

interface BookItemProps {
  book: BooksData
}

export function BookUpdate({ book }: BookItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedBook, setEditedBook] = useState(book)

  const deleteBookMutation = useDeleteBook()
  const updateBookMutation = useUpdateBook()
  const { data: coverUrl, refetch: refetchCover } = useBookCover(
    book.author,
    book.title,
  )

  useEffect(() => {
    setEditedBook(book)
  }, [book])

  const handleDelete = () => {
    deleteBookMutation.mutate(book.id)
  }

  const handleUpdate = () => {
    updateBookMutation.mutate({
      id: book.id,
      updatedBook: {
        title: editedBook.title,
        author: editedBook.author,
        summary: editedBook.summary,
      },
    })
    refetchCover()
    setIsEditing(false)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setEditedBook((prev) => ({ ...prev, [name]: value }))
  }

  const renderEditMode = () => (
    <div className="book-card editing">
      <input
        name="title"
        value={editedBook.title}
        onChange={handleInputChange}
        className="edit-input"
      />
      <input
        name="author"
        value={editedBook.author}
        onChange={handleInputChange}
        className="edit-input"
      />
      <textarea
        name="summary"
        value={editedBook.summary}
        onChange={handleInputChange}
        className="edit-textarea"
      />
      <div>
        <button className="save-button" onClick={handleUpdate}>
          Save
        </button>
        <button className="cancel-button" onClick={() => setIsEditing(false)}>
          Cancel
        </button>
      </div>
    </div>
  )

  const renderDisplayMode = () => (
    <div className="book-card">
      {coverUrl && (
        <img
          src={coverUrl}
          alt={`Cover of ${book.title}`}
          className="book-cover"
        />
      )}
      <h2 className="book-title">{book.title}</h2>
      <h3 className="book-author">{book.author}</h3>
      <p className="book-summary">{book.summary}</p>
      <div className="button-group">
        <button className="delete-button" onClick={handleDelete}>
          🗑️
        </button>
        <button className="edit-button" onClick={() => setIsEditing(true)}>
          ✏️
        </button>
        <button className="find-like-button">🔍</button>
      </div>
    </div>
  )

  return isEditing ? renderEditMode() : renderDisplayMode()
}
