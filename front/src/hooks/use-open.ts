import { useState, useCallback } from 'react'

const useOpen = (defualtValue = false) => {
  const [open, setOpen] = useState(defualtValue)

  const onOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const onClose = useCallback(() => {
    setOpen(false)
  }, [])

  return { open, onOpen, onClose }
}

export default useOpen
