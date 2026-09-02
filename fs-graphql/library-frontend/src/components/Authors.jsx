import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { EDIT_AUTHOR, ALL_AUTHORS } from "../App"

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [setBornTo] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.error(error.graphQLErrors?.[0]?.message || error.message)
    },
    onCompleted: (data) => {
      if(!data.setBornTo) {
        setError('Person not found')
      }
    }
  })

  if (!props.show) {
    return null
  }

  const authors = props.authors

  const submit = (event) => {
    event.preventDefault()
    setBornTo({ variables: { name, setBornTo: Number(born) } })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
          <div>
            <label htmlFor="name">name</label>
            <select
              id="name"
              value={name}
              onChange={({ target }) => setName(target.value)}
            >
              <option value="">select author</option>
              {authors.map((a) => (
                <option key={a.name} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="born">Birth Year</label>
            <input id="born" type="number" value = {born}
            onChange = {({target}) => setBorn(target.value)}
            />
          </div>
          <button type='submit'>Update Author</button>
      </form>
    </div>
  )
}

export default Authors