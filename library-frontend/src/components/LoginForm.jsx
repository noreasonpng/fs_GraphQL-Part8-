import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { LOGIN } from './Queries'

const LoginForm = ({show, setToken, setPage}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')  
  const [error, setError] = useState(null)

  const [ login ] = useMutation(LOGIN, {
      onCompleted: (data) => {
          const token = data.login.value
          setToken(token)
          localStorage.setItem('user-token', token)
          setPage('authors')
      },
      onError: (error) => {
        setError('login failed')
      }
  })  
  const submit = (event) => {
      event.preventDefault()
      login({variables: {username, password}})
      setUsername('')
      setPassword('')
  }

  if(!show){
    return null
  }

  return (
    <div>
      {error && <div>{error}</div>}
      <form onSubmit={submit}>
        <div>
          <label>username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            />
            </label>
        </div>
        <div>
          <label>password<input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          /></label>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )

}

export default LoginForm