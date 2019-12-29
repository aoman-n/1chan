import React, { createContext, useState } from 'react'

interface SampleContextValue {
  value: {
    name: string
  }
  setSampleState: (state: { name: string }) => void
}

export const SampleContext = createContext<SampleContextValue>({
  value: { name: '' },
  setSampleState: () => {}
})
export const SampleProvider = SampleContext.Provider

const Provider: React.FC = ({ children }) => {
  const [sampleState, setSampleState] = useState({ name: 'hogeeeee' })

  return (
    <SampleProvider value={{ value: sampleState, setSampleState }}>
      {children}
    </SampleProvider>
  )
}

export default Provider
