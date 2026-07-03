export default function AppLink({ href, active, onNavigate, children, className = '' }) {
  return (
    <a
      className={[className, active ? 'text-emerald-500 opacity-100' : ''].filter(Boolean).join(' ')}
      href={href}
      aria-current={active ? 'page' : undefined}
      onClick={(event) => {
        if (href.startsWith('http')) return
        event.preventDefault()
        onNavigate(href)
      }}
    >
      {children}
    </a>
  )
}
