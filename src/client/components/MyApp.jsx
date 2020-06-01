import React, { Component } from 'react'
import { searchBooks } from '../service/bookService'
import SearchBox from './SearchBox'
import AwesomeDebouncePromise from 'awesome-debounce-promise'
import SearchedContent from './SearchedContent'
const searchAPIDebounced = AwesomeDebouncePromise(searchBooks, 500)

export default class MyApp extends Component {
  constructor() {
    super()
    this.state = {
      results: [],
      pageNo: 1,
      searchText: '',
      totalResults: 0,
      isLoading: false,
    }
  }

  onSearch = async (e) => {
    this.setState({ searchText: e.target.value, isLoading: true })
    const booksResponse = await searchAPIDebounced(e.target.value.trim(), this.state.pageNo)
    const { results, totalResults } = booksResponse
    this.setState({ results, totalResults, isLoading: false })
  }

  getBooks = async (pageNo) => {
    if (pageNo == this.state.pageNo) return
    this.setState({ isLoading: true })
    const booksResponse = await searchBooks(this.state.searchText, pageNo)
    const { results, totalResults } = booksResponse
    this.setState({ results, totalResults, isLoading: false, pageNo })
  }

  render() {
    return (
      <div className="goodReads-app-container">
        <SearchBox value={this.state.searchText} setSearch={this.onSearch} />
        <SearchedContent
          books={this.state.results}
          searchQuery={this.state.searchText}
          page={{ pageNo: this.state.pageNo, totalResults: this.state.totalResults, getResults: this.getBooks }}
          isLoading={this.state.isLoading}
        />
      </div>
    )
  }
}
