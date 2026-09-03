import { useState } from 'react'
import { gql } from '@apollo/client'
import { useApolloClient, useQuery } from '@apollo/client/react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { ALL_AUTHORS, ALL_BOOKS, ME } from "./components/Queries"

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('user-token'))
  const client = useApolloClient()

  const authorsResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)
  const meResult = useQuery(ME, {skip: !token})

  if (authorsResult.loading) {
    return <div>loading...</div>
  }

  if (authorsResult.error) {
    return <div>error loading authors: {authorsResult.error.message}</div>
  }
  
  const onLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const favoriteGenre = meResult.data?.me?.favoriteGenre

  if(localStorage.getItem('user-token')){
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommendations')}>recommendations</button>
          <button onClick={onLogout}>logout</button>
        </div>

        <Authors show={page === 'authors'} authors={authorsResult.data?.allAuthors ?? []} token={token} />

        <Books show={page === 'books'} books = {booksResult.data?.allBooks ?? []}/>

        <NewBook show={page === 'add'} />

        <LoginForm show={page === 'login'} setToken={setToken} />

        <Recommendations show={page === 'recommendations'} genre = {favoriteGenre} books = {booksResult.data?.allBooks ?? []} />

      </div>
    )
  }else return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>

        <Authors show={page === 'authors'} authors={authorsResult.data?.allAuthors ?? []} token={token} />

        <Books show={page === 'books'} books = {booksResult.data?.allBooks ?? []}/>

        <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} />

      </div>
  )
}



export default App
