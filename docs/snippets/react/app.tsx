import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as React from 'react'
import { KhizabProvider } from 'khizab'
import { config } from './config'

export const queryClient = new QueryClient()

export function App() {
  return (
    <KhizabProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/** ... */}
      </QueryClientProvider>
    </KhizabProvider>
  )
}
