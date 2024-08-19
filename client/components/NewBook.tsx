import React, { useEffect, useState } from 'react'
import { useAddBook } from '../hooks/hooks'
import { Link } from 'react-router-dom'

export function NewBook() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [summary, setSummary] = useState('')
  const [showMessage, setShowMessage] = useState(false)

  const addBookMutation = useAddBook()

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showMessage])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addBookMutation.mutateAsync({ title, author, summary })

      setTitle('')
      setAuthor('')
      setSummary('')
      setShowMessage(true)
    } catch (error) {
      console.error('Error adding book:', error)
    }
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
