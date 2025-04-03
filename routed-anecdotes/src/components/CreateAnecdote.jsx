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
      content: content.value,
      author: author.value,
      info: url.value,
      votes: 0
    })
    navigate('/anecdotes')
    props.setNotification(`a new anecdote ${content} created!`)
    setTimeout(() => {
      props.setNotification('')
    }, 10000)
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...url} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}
CreateNew.propTypes = {
  addNew: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default CreateNew