import { useState, useEffect } from 'react'
import { getAll, getByName } from '../services/countries'

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

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const fetchCountry = async () => {
      if (name) {
        const responseAll = await getAll(name)
        const founded = responseAll.data.some((country) => country.name.common.toLowerCase() === name.toLowerCase())
        if (!founded) {
          setCountry({ found: false, data: null })
          return
        }

        const responseByName = await getByName(name)
        if (responseByName.status === 200) {
          setCountry({ found: true, data: responseByName.data })
        } else {
          setCountry({ found: false, data: null })
        }
      } else {
        setCountry(null)
      }
    }

    fetchCountry()
  }, [name])

  return country
}