
const Recommendations = (props) => {
  if (!props.show) {
    return null
  }

  const genre = props.genre
  const books = props.books
  const filteredBooks = genre ? books.filter((b) => b.genres.includes(genre)) : books

  return (
    <div>
      <h2>Recommendations</h2>
      <p>books in your favorite genre <b>{props.genre}</b></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations