import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  
  useEffect(() => {
    axios.get(baseUrl)
      .then(response => {
        setResources(response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [baseUrl])
  
  const getAll = async () => {
    const response = await axios.get(baseUrl)
    setResources(response.data)
  }

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource)
    setResources(resources.concat(response.data))
    return response.data
  }

  const service = {
    getAll,
    create,
  }

  return [
    resources, service
  ]
}