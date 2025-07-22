import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from './routes/Layout'
import DetailView from './routes/DetailView'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index={true} path="/" element={<App />} />
          <Route path="/recipeDetails/:id" element={<DetailView />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
