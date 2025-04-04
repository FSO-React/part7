import PropTypes from 'prop-types'

const AnecdoteDetail = ({ anecdote }) => {
  console.log("anecdote prop:", anecdote); // Add this line
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  )
}
AnecdoteDetail.propTypes = {
  anecdote: PropTypes.object
}

export default AnecdoteDetail