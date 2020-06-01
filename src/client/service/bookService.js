import * as axios from 'axios'
import { API_URL } from '../common/constants'

const getSearchBooksUrl = (searchQuery = '', pageNo = 1) => {
  return `${API_URL}/search-books?q=${searchQuery}&pageNo=${pageNo}`
}

export const searchBooks = async (searchQuery, pageNo) => {
  const config = {
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }
  const searchBooksUrl = getSearchBooksUrl(searchQuery, pageNo)
  try {
    const response = await axios.get(searchBooksUrl, config)
    return response.data
  } catch (e) {
    console.error(e)
    return []
  }
}
