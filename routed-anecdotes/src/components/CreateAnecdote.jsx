import { useField } from '../hooks/index'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const url = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.input.value,
      author: author.input.value,
      info: url.input.value,
      votes: 0
    })
    navigate('/anecdotes')
    props.setNotification(`a new anecdote ${content} created!`)
    setTimeout(() => {
      props.setNotification('')
    }, 10000)
  }

  const handleReset = (e) => {
    e.preventDefault()
    content.reset()
    author.reset()
    url.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.input} />
        </div>
        <div>
          author
          <input {...author.input} />
        </div>
        <div>
          url for more info
          <input {...url.input} />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}
CreateNew.propTypes = {
  addNew: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default CreateNew