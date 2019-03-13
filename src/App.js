import React from 'react';
import * as BooksAPI from './data/BooksAPI';
import Search from './Search';
import Bookshelf from './Bookshelf';
import { Route, Link } from 'react-router-dom';

import './App.css';



class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: [],
    shelves: ['read', 'wantToRead', 'currentlyReading', 'none'],
    selectOption: ''

  }

  componentDidMount() {
    this.getBooksFromDB();
  }

  getBooksFromDB() {
    BooksAPI.getAll().then(books => {
      this.setState({
        books: books
      })
    })
  }

  moveBookHandler = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(BooksAPI.getAll()
        .then(books => (() => {
          this.setState({ books: books });
        }))
      )
  }


  componentDidUpdate(prevState, prevProps, snapshot) {
    if(prevState.books !== this.state.books){
      this.getBooksFromDB();
    }
  }


  render() {
    return (
      <div className="app">
        <Route
          exact path='/'
          render={() => (
            <Bookshelf
              books={this.state.books}
              shelves={this.state.shelves}
              selected={this.moveBookHandler}
            />
          )}
          />

        <Route
          path='/search'
          render={() => (
            <Search
              results={this.state.searchResults}
              selected={this.moveBookHandler}
            />
          )}
          />
      </div>
    )
  }
}

export default BooksApp;
