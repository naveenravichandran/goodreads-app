const axios = require('axios')
const xml2js = require('xml2js')

const getSearchUrl = (searchQuery = '', pageNo = 1) => {
  console.log(process.env.API_KEY)
  return `https://www.goodreads.com/search/index.xml?key=${process.env.API_KEY}&q=${searchQuery}&page=${pageNo}`
}

const getBooks = async (searchQuery, pageNo) => {
  const params = {
    headers: {
      'Content-Type': 'text/xml',
      'Access-Control-Allow-Origin': '*',
    },
  }
  const url = getSearchUrl(searchQuery, pageNo)
  return await axios.get(url, params)
}

const searchBooks = async (searchQuery, pageNo) => {
  const xmlResponse = await getBooks(searchQuery, pageNo)
  const parser = new xml2js.Parser({
    explicitArray: false
  })
  const parsedJsonResponse = await parser.parseStringPromise(xmlResponse.data)
  const searchResponse = parsedJsonResponse.GoodreadsResponse.search
  const bookResults = searchResponse.results.work
  const formattedBookResults = (bookResults || []).map((book) => {
    const {
      books_count,
      average_rating,
      best_book: {
        title,
        author,
        image_url
      },
    } = book
    return {
      imageUrl: image_url,
      booksCount: books_count._,
      averageRating: average_rating,
      title,
      author: author.name,
    }
  })
  return {
    resultsStart: searchResponse['results-start'],
    resultsEnd: searchResponse['results-end'],
    totalResults: searchResponse['total-results'],
    results: formattedBookResults,
  }
}

module.exports = {
  searchBooks,
}