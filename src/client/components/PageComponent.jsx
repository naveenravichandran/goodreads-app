import React from 'react'
import classNames from 'classnames'

const getTotalPages = (totalResults) => {
  return totalResults % 20 == 0 ? Math.floor(totalResults / 20) : Math.floor(totalResults / 20) + 1
}

const getPaginatedElements = (pageNo, totalResults) => {
  const totalPages = getTotalPages(totalResults)
  let lowerLimit = Math.max(pageNo == totalPages ? pageNo - 3 : pageNo, 1)
  const upperLimit = Math.min(pageNo + 3, totalPages)
  lowerLimit = upperLimit - lowerLimit == 3 ? lowerLimit : upperLimit - 3
  let list = []
  for (let i = lowerLimit; i <= upperLimit; i++) {
    list.push(i)
  }
  return list
}

const PageComponent = ({ totalResults, pageNo, getResults }) => {
  const paginatedElements = getPaginatedElements(pageNo, totalResults)
  const getPreviousPageResults = () => {
    const previousPageNo = pageNo - 1
    if (previousPageNo < 1) return
    getResults(previousPageNo)
  }

  const getNextPageResults = () => {
    const nextPageNo = pageNo + 1
    const totalPages = getTotalPages(totalResults)
    if (nextPageNo > totalPages) return
    getResults(nextPageNo)
  }

  return (
    <div className="pagination">
      <div>
        <div className="page-field clickable" onClick={() => getResults(1)}>
          &lt; &lt; First
        </div>
        <div className="page-field clickable" onClick={getPreviousPageResults}>
          &lt; Previous
        </div>
        {paginatedElements.map((p, i) => {
          return (
            <div
              className={classNames({ 'page-field': true, clickable: p != pageNo, current: p == pageNo })}
              onClick={() => getResults(p)}
              key={i}
            >
              {p}
            </div>
          )
        })}
        <div className="page-field clickable" onClick={getNextPageResults}>
          Next &gt;
        </div>
        <div className="page-field clickable" onClick={() => getResults(getTotalPages(totalResults))}>
          Last &gt; &gt;
        </div>
      </div>
      <div>Results {totalResults}</div>
    </div>
  )
}

export default PageComponent
