import { useState } from 'react'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useFindBooks } from '../hooks/hooks'

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

type BookAttribute = (typeof bookAttributes)[number]

export default function BookAttributeSelect() {
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
                <li key={book.id} className="book-item">
                  <h3>{book.title}</h3>
                  <p>By {book.author}</p>
                  <p>{book.summary}</p>
                  <div className="book-attributes">
                    <strong>Attributes:</strong>
                    <p>{book.attribute}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No books match the selected attributes</p>
          )}
        </div>
      </div>

      <div>
        <Link to="/" className="link-home">
          Back to Books
        </Link>
      </div>
    </>
  )
}
