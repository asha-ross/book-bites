import { useState } from 'react'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FindBook } from '../../models/books'

//Update this: what I want to reflect is a list of attributes that WHEN COMBINED will show a curated book list
const bookAttributes = [
  'Chaos Ensues',
  'Endless Family Drama',
  'Rags to Riches',
  'Real Scary',
  'Adventure',
  'Sharp Satire',
] as const

type BookAttributes = (typeof bookAttributes)[number]

export default function BookAttributeSelect() {
  const [selectedAttribute, setSelectedAttribute] = useState<BookAttributes[]>(
    [],
  )
  const [filteredBooks] = useState<FindBook[]>([])

  const toggleAttribute = (attribute: BookAttributes) => {
    setSelectedAttribute((prev) =>
      prev.includes(attribute)
        ? prev.filter((a) => a !== attribute)
        : [...prev, attribute],
    )
  }

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
            {selectedAttribute.map((attribute) => (
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
                  selectedAttribute.includes(attribute) ? 'selected' : ''
                }`}
              >
                {attribute}
              </button>
            ))}
          </div>
        </div>

        <div className="book-list-container">
          <h2>Matching Books</h2>
          {filteredBooks.length > 0 ? (
            <ul className="book-list">
              {filteredBooks.map((book) => (
                <li key={book.id} className="book-item">
                  <h3>{book.title}</h3>
                  <p>By {book.author}</p>
                  <p>{book.summary}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              No books match the selected attributes. Try selecting fewer
              attributes.
            </p>
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

//possible attributes to use in future:
//'Spooky Old House',
// 'Unreliable Narrator',
// 'Is This Art or a Typo?',  'Hijinks',
// 'Hilarity Ensues',
// 'From Foes to...',
// 'Lone Wolf',
// 'Comfy',
// 'Slice of Life',  'Fancy Words, Deep Thoughts',
// 'Tissues Required',
// // 'Offend Me',   'Nice Person',
//   'Terrible Person',
//   'Average Person',
//   'Meet Cute',
//   'No Miscommunication Tropes',
//   'Whoops, Apocalypse!',
// 'Survival',
// 'Greek Gods, Family Reunion',   'Hero Journey',
// 'Dragons and Stuff',
// 'Dark',
// 'The Door is a Jar',
// 'History, But Make It Interesting',
// 'Sword & Sorcery & Snark',
// 'Clones, Clones Everywhere',
// 'Emotional Rollercoaster', 'Who Dunnit? No, Seriously.',
// 'Dystopia, But Make It Fashion',
// 'Reality Optional.',
// 'Shenanigans but Surreal',
// 'Redemption Arc',
// 'Descriptive but Literary',
// 'Talking Animals',
// 'All Metaphor',
