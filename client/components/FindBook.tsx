import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import { useBookCover, useFindBooks } from '../hooks/hooks'
import { BooksData } from '../../models/books'

export const bookAttributes = [
  'Chaos Ensues',
  'Endless Family Drama',
  'Rags to Riches',
  'Magical Realism',
  'Real Scary',
  'Weird Sci-Fi',
  'Adventure',
  'Sharp Satire',
  'Time Twists',
  'Spooky Old House',
  'Unreliable Narrator',
  'Is This Art or a Typo?',
  'Hijinks',
  'Comfy',
  'Slice of Life',
  'Fancy Words, Deep Thoughts',
  'Survival',
  'Greek Gods, Family Reunion',
  'Hero Journey',
  'Dragons and Stuff',
  'The Door is a Jar',
  'Reality Optional.',
  'Redemption Arc',
] as const

type BookAttribute = (typeof bookAttributes)[number]

interface FindBookProps {
  onAddToCollection: (book: BooksData) => void
  collectionIds: (string | number)[]
}

export default function FindBook({
  onAddToCollection,
  collectionIds,
}: FindBookProps) {
  const [selectedAttributes, setSelectedAttributes] = useState<BookAttribute[]>(
    [],
  )
  const currentAttribute =
    selectedAttributes[selectedAttributes.length - 1] || ''

  const { data: books, error } = useFindBooks('attribute', currentAttribute)

  const toggleAttribute = (attribute: BookAttribute) => {
    setSelectedAttributes((prev) =>
      prev.includes(attribute)
        ? prev.filter((a) => a !== attribute)
        : [...prev, attribute],
    )
  }

  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <div className="attribute-container">
        <h2 className="find-book-title">Pick Your Poison</h2>
        <div className="attribute-list">
          {selectedAttributes.map((attribute) => (
            <span key={attribute} className="attribute-tag">
              {attribute}
              <X onClick={() => toggleAttribute(attribute)} />
            </span>
          ))}
        </div>
        <div className="attribute-button-grid">
          {bookAttributes.map((attribute) => (
            <button
              key={attribute}
              onClick={() => toggleAttribute(attribute)}
              className={`attribute-button ${
                selectedAttributes.includes(attribute) ? 'selected' : ''
              }`}
            >
              {attribute}
            </button>
          ))}
        </div>
      </div>

      <div className="book-list-container">
        <h2>Matching Books</h2>
        {books && books.length > 0 ? (
          <ul className="book-list">
            {books.map((book) => (
              <BookItem
                key={book.id}
                book={book}
                onAddToCollection={onAddToCollection}
                isInCollection={collectionIds.includes(book.id)}
              />
            ))}
          </ul>
        ) : (
          <p>No books match the selected attributes</p>
        )}
      </div>
    </>
  )
}

interface BookItemProps {
  book: BooksData
  onAddToCollection: (book: BooksData) => void
  isInCollection: boolean
}

function BookItem({ book, onAddToCollection, isInCollection }: BookItemProps) {
  const {
    data: coverUrl,
    isLoading,
    error,
  } = useBookCover(book.title, book.author)

  return (
    <li className="book-item">
      {isLoading && <div className="cover-placeholder">Loading cover...</div>}
      {error && <div className="cover-placeholder">Cover not available</div>}
      {coverUrl && (
        <img
          src={coverUrl}
          alt={`Cover of ${book.title}`}
          className="book-cover"
        />
      )}
      <div className="book-details">
        <h3>{book.title}</h3>
        <p>By {book.author}</p>
        <p>{book.summary}</p>
        <div className="book-attributes">
          <strong>Attributes:</strong>
          <p>{book.attribute}</p>
        </div>
        {!isInCollection && (
          <button
            onClick={() => onAddToCollection(book)}
            className="add-to-collection"
          >
            <Plus size={16} />
            Add To My Collection
          </button>
        )}
      </div>
    </li>
  )
}
