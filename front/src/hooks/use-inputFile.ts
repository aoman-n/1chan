import { useState, createRef } from 'react'

const useInputFile = () => {
  const [fileName, setFileName] = useState('')
  const fileRef = createRef<HTMLInputElement>()

  const onChangeFile = () => {
    if (fileRef.current && fileRef.current.files) {
      setFileName(fileRef.current.files[0].name)
    }
  }

  return { fileRef, fileName, onChangeFile }
}

export default useInputFile
