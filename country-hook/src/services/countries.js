import axios from 'axios'

const API_URL = 'https://studies.cs.helsinki.fi/restcountries/api'

export const getAll = async () => {
  const response = await axios.get(`${API_URL}/all`)
  return response
}

export const getByName = async (name) => {
  const response = await axios.get(`${API_URL}/name/${name}`)
  return response
}
