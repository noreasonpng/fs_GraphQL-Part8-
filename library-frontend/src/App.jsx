import { useState } from 'react'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
        born
      }
      published
    }
  }
`

export const ADD_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author{
        name
        born
      }
      published
      genres
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor(
    $name: String!
    $setBornTo: Int!
  ) {
    editAuthor(name: $name, setBornTo: $setBornTo){
      name
      born
    }  
  }
`


const App = () => {
  const [page, setPage] = useState('authors')
  const authorsResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)

  if (authorsResult.loading) {
    return <div>loading...</div>
  }

  if (authorsResult.error) {
    return <div>error loading authors: {authorsResult.error.message}</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} authors = {authorsResult.data?.allAuthors ?? []} />

      <Books show={page === 'books'} books = {booksResult.data?.allBooks ?? []}/>

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
