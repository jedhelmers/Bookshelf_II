import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './data/BooksAPI';
import Book from './components/Book';
import DebounceInput from 'react-debounce-input';


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
    let temp = ''

    this.setState({search});

    if(search.length > 0) {
      BooksAPI.search(search.trim()).then(searchResults => {
        if(!searchResults.error) {
          if (searchResults.length > 0) {
            searchResults.map(res => (
                temp = this.props.compare.find(item => item.id === res.id),
                res.shelf = typeof temp === 'undefined' ? 'none' : temp.shelf
              )
            )
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

    let updatedBooks =  this.state.searchResults

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
          <DebounceInput
            debounceTimeout={300}
            type="text"
            value={this.state.search}
            onChange={this.changeHandler}
            placeholder="Search by title or author" />
          </form>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {
            updatedBooks.length > 0 && updatedBooks
              .map((book, index) => (
              <Book
                key={book.id}
                name='selectOption'
                book={book}
                select={this.props.selected}
                selectOption={book.shelf}
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
