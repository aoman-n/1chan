import { useState } from 'react'

const initialFormStatus = {
  isLoading: false,
  error: false,
  message: ''
}

const useForm = <T extends { [key: string]: string }>(initialState: T) => {
  const [formData, setFormData] = useState(initialState)
  const [formStatus, setFormStatus] = useState({
    isLoading: false,
    error: false,
    message: ''
  })

  const onChangeText = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const reset = () => {
    setFormData(initialState)
    setFormStatus(initialFormStatus)
  }

  return {
    formData,
    formStatus,
    setFormData,
    setFormStatus,
    reset,
    onChangeText
  }
}

export default useForm
