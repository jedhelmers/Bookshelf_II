import React from 'react'
import { Link } from 'react-router-dom'
import Book from './components/Book'


function CamelToTitle(str) {
  return (
    str.replace(/([A-Z])/g, (match) => ` ${match}`).replace(/^./, (match) => match.toUpperCase())
  )
}

function Bookshelf(props) {
  return (
    /*
      Bookshelf
    */

    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">

        <div>
          <div className='bookshelf'>
            {props.shelves.map(shelf => (
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {shelf !== 'none' && (
                    <React.Fragment>
                    <h2 className='underline'>{CamelToTitle(shelf)}</h2>
                    {props.books.filter(book => book.shelf === shelf).map(book => (
                      <Book name='selectOption' book={book} select={props.selected} selectOption={book.shelf}/>
                    ))}
                  </React.Fragment>
                  )}
                </div>
              )
            )}
          </div>
        </div>

      </div>

      <Link
        to='/search'
        className="open-search">
        <button >Add a book</button>
      </Link>

    </div>
  )
}

export default Bookshelf
