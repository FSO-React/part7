import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

export const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getAllBlogs = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export const update = async (updateObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${updateObject.id}`, updateObject, config)
  return response.data
}

export const remove = async (removeObject) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(removeObject)
  const response = await axios.delete(`${baseUrl}/${removeObject.id}`, config)
  console.log(response)
  return response.data
}