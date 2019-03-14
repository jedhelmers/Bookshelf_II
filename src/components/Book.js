import React from 'react'

function Stars(props) {
  return (
    <span>
      {props.averageRating > 0 ? (
        <div className="stars stars-outer">
          <div className="stars-inner" style={{ width: (props.averageRating * 10) }}></div>
        </div>
      ) : (
        <div className='stars help'>No Rating</div>
      )
    }
    </span>
  )
}

function Authors(props) {
  return (
    <React.Fragment>
      {props.authors != undefined && (
        props.authors.map(author => (
          <div className='help'>{author}</div>
        ))
      )}

    </React.Fragment>
  )
}

function Book(props) {

  let { authors, averageRating, title, subtitle, keys, id, shelf, imageLinks } = props.book
  const thumb = (typeof imageLinks === 'undefined') ? null : `url(${imageLinks['thumbnail']})`
  averageRating = (typeof averageRating === 'undefined') ? 0 : averageRating

  return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: thumb }}></div>
          <div className="book-shelf-changer">
            <select name={props.selectOption} onChange={e => props.select(props.book, e.target.value)} value={props.selectOption}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <Stars averageRating={averageRating}/>
        <div className="book-title">{title}</div>
        <Authors authors={authors}/>
      </div>
  )
}


export default Book
