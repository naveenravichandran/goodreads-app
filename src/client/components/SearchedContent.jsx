import React from 'react'
import PageComponent from './PageComponent'
import BookCard from './BookCard'

const Loader = () => (
  <div className="loader-container">
    <div className="loader" />
  </div>
)

const NoResultText = ({ searchQuery }) => {
  return (
    <div className="no-results-text">
      {searchQuery.length ? (
        <p>Sorry. No books available in the name {searchQuery}</p>
      ) : (
        <p>Please enter book name to search</p>
      )}
    </div>
  )
}

const Book = ({ books, page }) => {
  let { pageNo, totalResults, getResults } = page
  return (
    <>
      {books.map((book, i) => (
        <BookCard {...book} key={i} />
      ))}
      <PageComponent totalResults={totalResults} pageNo={pageNo} getResults={getResults} />
    </>
  )
}

const SearchedContent = ({ books, searchQuery, isLoading, page }) => {
  return (
    <div className="books-container">
      {isLoading ? (
        <Loader />
      ) : books.length ? (
        <Book books={books} page={page} />
      ) : (
        <NoResultText searchQuery={searchQuery} />
      )}
    </div>
  )
}

export default SearchedContent
