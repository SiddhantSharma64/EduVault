import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AppProvider } from './lib/context/AppContext'

createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <App />
  </AppProvider>
);
