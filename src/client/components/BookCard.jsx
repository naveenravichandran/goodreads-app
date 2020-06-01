import React from 'react'

const BookCard = ({ imageUrl, booksCount, averageRating, title, author }) => {
  return (
    <div className="book-card">
      <img src={imageUrl} />
      <div className="title">
        {title} by {author}
      </div>
      <div>
        <label>Books Available: </label>
        {booksCount}
      </div>
      <div>
        <label>Rating: </label>
        {averageRating}
      </div>
    </div>
  )
}

export default BookCard
