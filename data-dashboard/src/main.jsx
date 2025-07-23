import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Link } from "react-router-dom"
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
        <Route
            path="*"
            element={
              <main>
                <p>Page not found!</p>
                <Link style={{ color: "black" }} to="/">
                  Back to Home
                </Link>
              </main>
            }
          />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
