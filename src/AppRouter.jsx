import { useCallback, useEffect, useState } from 'react'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminLoginPage from './pages/AdminLoginPage'
import HomePage from './pages/HomePage'
import StaticPage from './pages/StaticPage'
import FooterSection from './sections/FooterSection'
import HeaderSection from './sections/HeaderSection'
import { api } from './lib/api'
import { defaultSiteContent, sectionsToSiteContent } from './lib/siteContent'

function getPathname() {
  return window.location.pathname || '/'
}

function isAdminPath(path) {
  return path === '/admin' || path === '/admin/login' || path.startsWith('/admin/')
}

export default function AppRouter() {
  const [path, setPath] = useState(getPathname)
  const [publicContent, setPublicContent] = useState(defaultSiteContent)
  const [adminUser, setAdminUser] = useState(null)
  const [adminReady, setAdminReady] = useState(false)
  const [loginEmail, setLoginEmail] = useState('admin@medicashop.com')
  const [loginPassword, setLoginPassword] = useState('password123')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  const navigate = useCallback(
    (nextPath) => {
      if (nextPath === path) return
      window.history.pushState({}, '', nextPath)
      setPath(nextPath)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [path],
  )

  useEffect(() => {
    const handlePopState = () => setPath(getPathname())
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    let cancelled = false

    const loadPublicContent = async () => {
      try {
        const response = await api.fetchPublicContent()
        if (!cancelled) {
          setPublicContent(sectionsToSiteContent(response.data ?? []))
        }
      } catch {
        if (!cancelled) {
          setPublicContent(defaultSiteContent)
        }
      }
    }

    loadPublicContent()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    const verifyAdmin = async () => {
      if (!isAdminPath(path)) {
        setAdminReady(true)
        setAdminUser(null)
        return
      }

      const token = api.getToken()
      if (!token) {
        setAdminUser(null)
        setAdminReady(true)
        if (path !== '/admin/login') {
          navigate('/admin/login')
        }
        return
      }

      setAdminReady(false)
      try {
        const response = await api.meAdmin()
        if (cancelled) return

        setAdminUser(response.user ?? null)
        setAdminReady(true)

        if (path === '/admin/login') {
          navigate('/admin')
        }
      } catch {
        if (cancelled) return
        api.setToken(null)
        setAdminUser(null)
        setAdminReady(true)
        if (path !== '/admin/login') {
          navigate('/admin/login')
        }
      }
    }

    verifyAdmin()

    return () => {
      cancelled = true
    }
  }, [navigate, path])

  const submitAdminLogin = async (event) => {
    event.preventDefault()
    setLoginError('')
    setLoginLoading(true)

    try {
      const response = await api.loginAdmin(loginEmail, loginPassword)
      api.setToken(response.token)
      setAdminUser(response.user ?? null)
      setAdminReady(true)
      navigate('/admin')
    } catch (requestError) {
      setLoginError(requestError.message)
    } finally {
      setLoginLoading(false)
    }
  }

  let content
  if (path === '/') {
    content = <HomePage content={publicContent} />
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
  } else if (path === '/admin/login') {
    content = (
      <AdminLoginPage
        email={loginEmail}
        password={loginPassword}
        error={loginError}
        loading={loginLoading}
        onEmailChange={setLoginEmail}
        onPasswordChange={setLoginPassword}
        onSubmit={submitAdminLogin}
      />
    )
  } else if (isAdminPath(path)) {
    content = (
      <AdminDashboardPage
        onNavigate={navigate}
        adminUser={adminUser}
        ready={adminReady}
        path={path}
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

  if (isAdminPath(path)) {
    return <div className="app-shell">{content}</div>
  }

  return (
    <div className="app-shell">
      <HeaderSection path={path} onNavigate={navigate} content={publicContent.header} />
      <main>{content}</main>
      <FooterSection onNavigate={navigate} content={publicContent.footer} />
    </div>
  )
}
