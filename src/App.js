import React from 'react'
import { Root, Routes } from 'react-static'
import { Router, Link } from '@reach/router'
import Secrets from './Components/Secrets';
import './app.scss'

function App() {
  return (
    <React.Suspense fallback={<span>Loading...</span>}>
      <Root>
        <Routes />
        <Router>
          <Secrets path="/secrets/:id" />
        </Router>
      </Root>
    </React.Suspense>
  )
}

export default App
