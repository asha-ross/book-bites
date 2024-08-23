import { X } from 'lucide-react'
import { BooksData } from '../../models/books'

interface BookCollectionProps {
  collection: BooksData[]
  onRemoveFromCollection: (bookId: string | number) => void
}

export default function BookCollection({
  collection,
  onRemoveFromCollection,
}: BookCollectionProps) {
  return (
    <div className="collection-container">
      <h2>Your Book Collection</h2>
      {collection.length > 0 ? (
        <ul className="collection-list">
          {collection.map((book) => (
            <li key={book.id} className="collection-item">
              <h3>{book.title}</h3>
              <p>By {book.author}</p>
              <button
                onClick={() => onRemoveFromCollection(book.id)}
                className="remove-from-collection"
              >
                <X size={14} /> Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your collection is empty. Add books from the list above!</p>
      )}
    </div>
  )
}
