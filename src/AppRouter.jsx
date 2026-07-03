import { useEffect, useState } from 'react'
import FooterSection from './sections/FooterSection'
import HeaderSection from './sections/HeaderSection'
import HomePage from './pages/HomePage'
import StaticPage from './pages/StaticPage'

function getPathname() {
  return window.location.pathname || '/'
}

export default function AppRouter() {
  const [path, setPath] = useState(getPathname)

  useEffect(() => {
    const handlePopState = () => setPath(getPathname())
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (nextPath) => {
    if (nextPath === path) return
    window.history.pushState({}, '', nextPath)
    setPath(nextPath)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  let content
  if (path === '/') {
    content = <HomePage />
  } else if (path === '/about') {
    content = (
      <StaticPage
        title="About us"
        description="This route is wired so the navigation feels real while we keep the focus on the homepage design."
      />
    )
  } else if (path === '/shop') {
    content = (
      <StaticPage
        title="Shop"
        description="Product categories and collection pages can be expanded here without reworking the landing page."
      />
    )
  } else if (path === '/contact') {
    content = (
      <StaticPage
        title="Contact us"
        description="A dedicated contact page is ready for future form content, maps, and support details."
      />
    )
  } else if (path === '/pages') {
    content = (
      <StaticPage
        title="Pages"
        description="This placeholder route makes the menu complete and keeps the navigation behavior clear."
      />
    )
  } else {
    content = (
      <StaticPage
        title="Page not found"
        description="The requested route does not exist yet, so we are showing a clean fallback state."
      />
    )
  }

  return (
    <div className="app-shell">
      <HeaderSection path={path} onNavigate={navigate} />
      <main>{content}</main>
      <FooterSection onNavigate={navigate} />
    </div>
  )
}
