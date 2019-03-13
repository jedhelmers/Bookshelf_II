import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './data/BooksAPI';
import Book from './components/Book';


class Search extends React.PureComponent<Props> {

  constructor(props){
    super(props)
    this.state = {
      search: '',
      searchResults: []
    }

    this.changeHandler = this.changeHandler.bind(this);
  }

  componentDidUpdate(prevState, prevProps){
    if((prevProps.search !== '') && (this.state.search === '')) {
      this.setState({ searchResults: [] });
    }
  }


  changeHandler(event) {
    const search = event.target.value;

    this.setState({search});

    if(search.length > 0) {
      BooksAPI.search(search.trim()).then(searchResults => {
        if(!searchResults.error) {
          if (searchResults.length > 0) {
            this.setState(() => (
              {searchResults: searchResults}
            ))
          } else {
            this.setState({ searchResults: [] });

          }
        }
      })
    }
  }

  render() {
    return (
      /*
        Search
      */
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
          >
            <button className="close-search">Close</button>
          </Link>


          <div className="search-books-input-wrapper">
          <form>
          <input type="text"
            value={this.state.search}
            onChange={this.changeHandler}
            placeholder="Search by title or author"
          />
          </form>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {this.state.searchResults.length > 0 && this.state.searchResults.map((book, index) => (
            <Book
              key={index}
              name='selectOption'
              book={book}
              select={this.props.selected}
              selectOption={book.shelf === 'undefined' ? book.shelf : 'none'}
            />

          ))
        }
        </ol>

        </div>
      </div>
    )
  }

}

export default Search;
