import React from 'react'
import logo from '../img/research.png'

const SearchBox = ({ searchQuery, setSearch }) => {
  return (
    <div className="header-container">
      <h3>GoodReads App</h3>
      <img className={'search-icon'} src={logo}></img>
      <div className="search-input-container">
        <input type="search" placeholder="Search Books" onChange={setSearch} value={searchQuery} />
      </div>
    </div>
  )
}

export default SearchBox
