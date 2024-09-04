import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SimulationProvider } from './context/SimulationContex.tsx'
import { CPUProvider } from './context/CPUContext.tsx'
import { RAMProvider } from './context/RAMContext.tsx'
import { BusProvider } from './context/BUSContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SimulationProvider>
      <BusProvider>
        <CPUProvider>
          <RAMProvider>
            <App />
          </RAMProvider>
        </CPUProvider>
      </BusProvider>
    </SimulationProvider>
  </StrictMode>,
)
