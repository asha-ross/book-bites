import BooksList from '../components/Book'

function Home() {
  return (
    <>
      <header className="header">
        <h1 className="title">Book Bites</h1>
        <h2 className="subtitle">literature in a nutshell</h2>
      </header>
      <main>
        <BooksList />
      </main>
    </>
  )
}

export default Home
