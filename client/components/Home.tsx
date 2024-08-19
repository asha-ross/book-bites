import { Link } from 'react-router-dom'
import BooksList from '../components/Book'

function Home() {
  return (
    <>
      <header className="header">
        <h1 className="title">Book Bites</h1>
        <h2 className="subtitle">literature in a nutshell</h2>
      </header>
      <div className="button-container">
        <Link to="/NewBook">
          <button className="new-book-button">Add New Book</button>
        </Link>
        <Link to="/FindBook">
          <button className="find-book-button">Find New Book</button>
        </Link>
      </div>
      <main>
        <BooksList />
      </main>
    </>
  )
}

export default Home
