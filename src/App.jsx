import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import Loader from './components/Loader'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import ProjectDetail from './pages/ProjectDetail'
import Services from './pages/Services'
import About from './pages/About'
import Inspiration from './pages/Inspiration'
import Contact from './pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function PageWrapper({ children }) {
  return (
    <div className="page-enter">
      {children}
    </div>
  )
}

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/portfolio" element={<PageWrapper><Portfolio /></PageWrapper>} />
        <Route path="/portfolio/:id" element={<PageWrapper><ProjectDetail /></PageWrapper>} />
        <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/inspiration" element={<PageWrapper><Inspiration /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
      </Routes>
      <Footer />
    </>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <BrowserRouter>
      <Cursor />
      {loading ? <Loader /> : <AppContent />}
    </BrowserRouter>
  )
}