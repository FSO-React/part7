/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react'
import {
  Routes,
  Route,
  useMatch,
} from 'react-router-dom'

import About from './components/About'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteDetail from './components/AnecdoteDetail'
import Footer from './components/Footer'
import CreateAnecdote from './components/CreateAnecdote'
import Menu from './components/Menu'


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  // const anecdoteById = (id) =>
  //   anecdotes.find(a => a.id === id)

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id)

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1
  //   }

  //   setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  // }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(a => Number(a.id) === Number(match.params.id))
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification && <div>{notification}</div>}
      <br />
      <Routes>
        <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/anecdotes/:id" element={<AnecdoteDetail anecdote={anecdote} />} />
        <Route path="/create" element={<CreateAnecdote addNew={addNew} setNotification={setNotification} />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
