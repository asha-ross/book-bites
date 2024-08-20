import React, { useEffect, useState } from 'react'
import { fetchBookCover, useAddBook } from '../hooks/hooks'
import { Link } from 'react-router-dom'
import { bookAttributes } from './FindBook'

type BookAttribute = (typeof bookAttributes)[number]

export function NewBook() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [summary, setSummary] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const [coverUrl, setCoverUrl] = useState<string | null>(null)
  const [attributes, setAttributes] = useState<BookAttribute[]>([])

  const addBookMutation = useAddBook()

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showMessage])

  useEffect(() => {
    const fetchCover = async () => {
      if (title && author) {
        const url = await fetchBookCover(title, author)
        setCoverUrl(url)
      }
    }
    fetchCover()
  }, [title, author])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addBookMutation.mutateAsync({
        title,
        author,
        summary,
        attribute: attributes.join(', '),
        cover_url: coverUrl,
      })

      setTitle('')
      setAuthor('')
      setSummary('')
      setAttributes([])
      setCoverUrl(null)
      setShowMessage(true)
    } catch (error) {
      console.error('Error adding book:', error)
    }
  }

  const toggleAttribute = (attribute: BookAttribute) => {
    setAttributes((prev) =>
      prev.includes(attribute)
        ? prev.filter((a) => a !== attribute)
        : [...prev, attribute],
    )
  }

  return (
    <>
      <header>
        <h1>Add to Your Book Collection</h1>
      </header>
      <div className="form-container">
        <h2 className="form-title">Add a New Book</h2>
        {showMessage && <div className="success-message">New book added!</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title:
            </label>
            <input
              type="text"
              id="title"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="author" className="form-label">
              Author:
            </label>
            <input
              type="text"
              id="author"
              className="form-input"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="summary" className="form-label">
              Summary:
            </label>
            <textarea
              id="summary"
              className="form-textarea"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <fieldset>
              <legend className="form-label">Attributes:</legend>
              <div className="attribute-button-grid">
                {bookAttributes.map((attribute) => (
                  <button
                    key={attribute}
                    type="button"
                    onClick={() => toggleAttribute(attribute)}
                    className={`attribute-button ${
                      attributes.includes(attribute) ? 'selected' : ''
                    }`}
                  >
                    {attribute}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
          {coverUrl && (
            <div className="form-group">
              <span id="cover-preview-label" className="form-label">
                Book Cover Preview:
              </span>
              <img
                src={coverUrl}
                alt="Book cover preview"
                className="cover-preview"
                aria-labelledby="cover-preview-label"
              />
            </div>
          )}
          <div className="button-group">
            <button type="submit" className="form-submit">
              Add Book
            </button>
            <Link to="/" className="link-home">
              Back to Books
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}
