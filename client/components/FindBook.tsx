import { useEffect, useState } from 'react'
import { X, Plus } from 'lucide-react'
// import { Link } from 'react-router-dom'
import { useBookCover, useFindBooks } from '../hooks/hooks'
import { BooksData } from '../../models/books'

export const bookAttributes = [
  'Chaos Ensues',
  'Endless Family Drama',
  'Rags to Riches',
  'Real Scary',
  'Adventure',
  'Sharp Satire',
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

interface BookItemProps {
  book: BooksData
}

type BookAttribute = (typeof bookAttributes)[number]

function BookItem({
  book,
  onAddToCollection,
  isInCollection,
}: BookItemProps & {
  onAddToCollection: (book: BooksData) => void
  isInCollection: boolean
}) {
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

export default function BookAttributeSelect() {
  const [selectedAttributes, setSelectedAttributes] = useState<BookAttribute[]>(
    [],
  )
  const [collection, setCollection] = useState<BooksData[]>([])
  const currentAttribute =
    selectedAttributes[selectedAttributes.length - 1] || ''

  const { data: books, error } = useFindBooks('attribute', currentAttribute)

  useEffect(() => {
    const savedCollection = localStorage.getItem('bookCollection')
    if (savedCollection) {
      setCollection(JSON.parse(savedCollection))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('bookCollection', JSON.stringify(collection))
  }, [collection])

  const toggleAttribute = (attribute: BookAttribute) => {
    setSelectedAttributes((prev) =>
      prev.includes(attribute)
        ? prev.filter((a) => a !== attribute)
        : [...prev, attribute],
    )
  }

  const addToCollection = (book: BooksData) => {
    setCollection((prev) => [...prev, book])
  }

  const removeFromCollection = (bookId: string | number) => {
    setCollection((prev) => prev.filter((book) => book.id !== bookId))
  }

  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <div className="collection-container">
        <h2>Your Book Collection</h2>
        {collection.length > 0 ? (
          <ul className="collection-list">
            {collection.map((book) => (
              <li key={book.id} className="collection-item">
                <h3>{book.title}</h3>
                <p>By {book.author}</p>
                <button
                  onClick={() => removeFromCollection(book.id)}
                  className="remove-from-collection"
                >
                  <X size={16} /> Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your collection is empty. Add books from the list above!</p>
        )}
      </div>
      <header>
        <h1>Find Your Next Read</h1>
        <p>Choose the qualities you want in your curated book list</p>
      </header>

      <div className="content-container">
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
                  onAddToCollection={addToCollection}
                  isInCollection={collection.some((b) => b.id === book.id)}
                />
              ))}
            </ul>
          ) : (
            <p>No books match the selected attributes</p>
          )}
        </div>
      </div>
    </>
  )
}
