// Todo App
import React from 'react'

// React Router Dom
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Import Components
import ViewTodo from './components/ViewTodo'

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ViewTodo />} />
        </Routes>
      </BrowserRouter>
  )
}
