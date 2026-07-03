import { useCallback, useEffect, useMemo, useState } from 'react'
import { api } from '../lib/api'

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/admin', icon: 'DB' },
  {
    label: 'Inventory',
    icon: 'IN',
    children: [
      { label: 'List of Medicines', path: '/admin/inventory/sections' },
      { label: 'Medicine Groups', path: '/admin/inventory/groups' },
    ],
  },
  {
    label: 'Reports',
    icon: 'RP',
    children: [
      { label: 'Sales Report', path: '/admin/reports' },
      { label: 'Payments Report', path: '/admin/reports' },
    ],
  },
  { label: 'Configuration', path: '/admin/configuration', icon: 'CF' },
  { label: 'Contact Management', path: '/admin/contact-management', icon: 'CM' },
  { label: 'Notifications', path: '/admin/notifications', icon: 'NT' },
  { label: 'Chat with Visitors', path: '/admin/chat', icon: 'CH' },
  { label: 'Application Settings', path: '/admin/application-settings', icon: 'AS' },
  { label: 'Covid -19', path: '/admin/covid', icon: 'CV' },
]

const SECTION_GROUPS = [
  { key: 'content', label: 'Content', sectionTypes: ['navigation', 'banner', 'content', 'footer'] },
  { key: 'hero', label: 'Hero', sectionTypes: ['hero'] },
  { key: 'catalog', label: 'Catalog', sectionTypes: ['catalog'] },
  { key: 'promo', label: 'Promotions', sectionTypes: ['promotion'] },
  { key: 'social', label: 'Social Proof', sectionTypes: ['feature', 'logos', 'social-proof'] },
  { key: 'form', label: 'Forms', sectionTypes: ['form'] },
]

const PLACEHOLDER_ROUTES = new Set([
  '/admin/contact-management',
  '/admin/notifications',
  '/admin/chat',
  '/admin/application-settings',
  '/admin/covid',
])

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function createDraft(section = {}) {
  const payload = section.data && typeof section.data === 'object' ? section.data : {}

  return {
    id: section.id ?? null,
    key: section.key ?? '',
    label: section.label ?? '',
    section_type: section.section_type ?? 'section',
    description: section.description ?? '',
    sort_order: section.sort_order ?? 0,
    is_active: section.is_active ?? true,
    dataText: JSON.stringify(payload, null, 2),
  }
}

function getNormalizedPath(path) {
  const value = (path || '/admin').replace(/\/+$/, '')
  return value || '/admin'
}

function getRouteInfo(path) {
  const normalized = getNormalizedPath(path)

  if (normalized === '/admin' || normalized === '/admin/dashboard') {
    return { page: 'dashboard', path: normalized }
  }

  if (normalized === '/admin/inventory/sections') {
    return { page: 'medicine-list', path: normalized }
  }

  const sectionMatch = normalized.match(/^\/admin\/inventory\/sections\/([^/]+)$/)
  if (sectionMatch) {
    return { page: 'medicine-detail', path: normalized, key: decodeURIComponent(sectionMatch[1]) }
  }

  if (normalized === '/admin/inventory/groups') {
    return { page: 'group-list', path: normalized }
  }

  const groupMatch = normalized.match(/^\/admin\/inventory\/groups\/([^/]+)$/)
  if (groupMatch) {
    return { page: 'group-detail', path: normalized, key: decodeURIComponent(groupMatch[1]) }
  }

  if (normalized === '/admin/reports') {
    return { page: 'reports', path: normalized }
  }

  if (normalized === '/admin/configuration') {
    return { page: 'configuration', path: normalized }
  }

  if (PLACEHOLDER_ROUTES.has(normalized)) {
    return { page: 'placeholder', path: normalized }
  }

  return { page: 'dashboard', path: normalized }
}

function getSectionGroup(section) {
  const map = {
    navigation: 'content',
    banner: 'content',
    content: 'content',
    footer: 'content',
    hero: 'hero',
    catalog: 'catalog',
    promotion: 'promo',
    feature: 'social',
    logos: 'social',
    'social-proof': 'social',
    form: 'form',
  }

  return map[section?.section_type] ?? 'other'
}

function getGroupMeta(groupKey) {
  return (
    SECTION_GROUPS.find((group) => group.key === groupKey) ?? {
      key: 'other',
      label: 'Other',
      sectionTypes: [],
    }
  )
}

function getGroupLabel(groupKey) {
  return getGroupMeta(groupKey).label
}

function countPayloadEntries(section) {
  if (!section?.data || typeof section.data !== 'object') return 0
  return Object.keys(section.data).length
}

function fakeMedicineId(section) {
  const id = String(section.id ?? 0).padStart(2, '0')
  const order = String(section.sort_order ?? 0).padStart(2, '0')
  return `D06ID${id}23${order}`
}

function fakeStock(section) {
  const value = 20 + Number(section.sort_order || 0) * 15 + countPayloadEntries(section) * 3
  return Math.max(1, value)
}

function formatClock(value) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(value)
}

function initials(name) {
  if (!name) return 'AD'
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

function cx(...parts) {
  return parts.filter(Boolean).join(' ')
}

function ShellButton({ active, nested, onClick, icon, label, badge }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        'flex w-full items-center gap-3 border-l-4 px-4 py-3 text-left text-sm transition',
        nested ? 'pl-8' : 'pl-4',
        active
          ? 'border-cyan-400 bg-cyan-600 text-white'
          : 'border-transparent text-slate-200 hover:bg-white/5 hover:text-white',
      )}
    >
      <span
        className={cx(
          'grid h-5 w-5 place-items-center rounded border text-[10px] font-bold',
          active ? 'border-white/30 bg-white/10 text-white' : 'border-white/10 bg-white/5 text-slate-300',
        )}
      >
        {icon}
      </span>
      <span className="flex-1">{label}</span>
      {badge ? (
        <span className="rounded-full bg-[#ff5a52] px-2 py-0.5 text-[10px] font-bold text-white">
          {badge}
        </span>
      ) : null}
    </button>
  )
}

function SidebarSection({ title, children }) {
  return (
    <div className="space-y-1">
      <p className="px-4 pt-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white/30">
        {title}
      </p>
      {children}
    </div>
  )
}

function SearchField({ value, onChange, placeholder, className }) {
  return (
    <div className={cx('relative', className)}>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-9 w-full rounded-[3px] border border-slate-300 bg-[#edf2f7] px-4 pr-10 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-sky-400"
      />
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
        Search
      </span>
    </div>
  )
}

function PrimaryButton({ tone = 'red', className, children, ...props }) {
  const styles = {
    red: 'bg-[#ff5a52] text-white hover:bg-[#ff4b44]',
    blue: 'bg-[#1798e5] text-white hover:bg-[#0e84cf]',
    teal: 'bg-[#14b8a6] text-white hover:bg-[#0f9e90]',
    white: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
  }

  return (
    <button
      {...props}
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-[3px] px-4 py-3 text-sm font-bold transition',
        styles[tone],
        className,
      )}
    >
      {children}
    </button>
  )
}

function StatCard({ title, value, subtitle, accent, footer, onClick }) {
  const borderStyles = {
    blue: 'border-sky-300',
    green: 'border-emerald-300',
    yellow: 'border-amber-300',
    red: 'border-rose-300',
  }

  const footerStyles = {
    blue: 'bg-sky-100 text-sky-800 border-sky-300',
    green: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    yellow: 'bg-amber-100 text-amber-800 border-amber-300',
    red: 'bg-rose-100 text-rose-800 border-rose-300',
  }

  return (
    <article
      onClick={onClick}
      className={cx(
        'overflow-hidden rounded-[4px] border bg-white shadow-[0_1px_3px_rgba(15,23,42,0.08)]',
        borderStyles[accent] ?? borderStyles.blue,
        onClick ? 'cursor-pointer' : '',
      )}
    >
      <div className="flex min-h-[150px] flex-col items-center justify-center px-5 py-5 text-center">
        <div className="grid h-11 w-11 place-items-center rounded-full border-2 border-current text-lg font-black">
          +
        </div>
        <div className="mt-3 text-[28px] font-extrabold leading-none tracking-[-0.05em] text-slate-900">
          {value}
        </div>
        <div className="mt-2 text-sm font-semibold text-slate-700">{title}</div>
        {subtitle ? <div className="mt-1 text-xs text-slate-500">{subtitle}</div> : null}
      </div>
      {footer ? (
        <div className={cx('border-t px-4 py-2 text-center text-xs font-semibold', footerStyles[accent] ?? footerStyles.blue)}>
          {footer}
        </div>
      ) : null}
    </article>
  )
}

function Panel({ title, subtitle, action, children, className }) {
  return (
    <section className={cx('rounded-[4px] border border-slate-300 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.08)]', className)}>
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-3">
        <div>
          <h2 className="text-[17px] font-bold tracking-[-0.03em] text-slate-900">{title}</h2>
          {subtitle ? <p className="text-xs text-slate-500">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}

function Table({ columns, rows, rowKey, renderRow, onRowClick, emptyLabel = 'No records found.' }) {
  if (!rows.length) {
    return <div className="px-5 py-8 text-sm text-slate-500">{emptyLabel}</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-0 text-left">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="border-b border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={rowKey(row)}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={cx('border-b border-slate-200', onRowClick ? 'cursor-pointer hover:bg-slate-50' : '')}
            >
              {renderRow(row)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Modal({ open, title, subtitle, onClose, children, maxWidth = 'max-w-4xl' }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 px-4">
      <div className={cx('w-full rounded-[4px] bg-white shadow-[0_20px_50px_rgba(15,23,42,0.35)]', maxWidth)}>
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Pharma One</p>
            <h3 className="mt-1 text-2xl font-extrabold tracking-[-0.04em] text-slate-900">{title}</h3>
            {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full border border-slate-300 text-lg font-bold text-slate-500 hover:bg-slate-50"
          >
            X
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

function Field({ label, children, className }) {
  return (
    <label className={cx('block', className)}>
      <span className="mb-2 block text-xs font-semibold text-slate-700">{label}</span>
      {children}
    </label>
  )
}

function SectionEditorModal({ open, draft, title, onClose, onChange, onSave, saving, groupLabel }) {
  return (
    <Modal
      open={open}
      title={title}
      subtitle={groupLabel ? `Editing ${groupLabel}` : 'Manage the selected inventory item.'}
      onClose={onClose}
      maxWidth="max-w-3xl"
    >
      <form onSubmit={onSave} className="grid gap-5 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Medicine Name">
            <input
              value={draft.label}
              onChange={(event) => onChange('label', event.target.value)}
              className="w-full rounded-[3px] border border-slate-300 bg-[#edf2f7] px-4 py-3 text-sm outline-none focus:border-sky-400"
              placeholder="Enter name"
            />
          </Field>
          <Field label="Medicine ID">
            <input
              value={draft.key}
              onChange={(event) => onChange('key', event.target.value)}
              className="w-full rounded-[3px] border border-slate-300 bg-[#edf2f7] px-4 py-3 text-sm outline-none focus:border-sky-400"
              placeholder="Enter unique key"
            />
          </Field>
          <Field label="Medicine Group">
            <input
              value={draft.section_type}
              onChange={(event) => onChange('section_type', event.target.value)}
              className="w-full rounded-[3px] border border-slate-300 bg-[#edf2f7] px-4 py-3 text-sm outline-none focus:border-sky-400"
              placeholder="Group type"
            />
          </Field>
          <Field label="Quantity in Number">
            <input
              type="number"
              value={draft.sort_order}
              onChange={(event) => onChange('sort_order', event.target.value)}
              className="w-full rounded-[3px] border border-slate-300 bg-[#edf2f7] px-4 py-3 text-sm outline-none focus:border-sky-400"
            />
          </Field>
        </div>

        <Field label="How to Use">
          <textarea
            rows={4}
            value={draft.description}
            onChange={(event) => onChange('description', event.target.value)}
            className="w-full rounded-[3px] border border-slate-300 bg-[#edf2f7] px-4 py-3 text-sm outline-none focus:border-sky-400"
          />
        </Field>

        <Field label="Side Effects">
          <textarea
            rows={5}
            value={draft.dataText}
            onChange={(event) => onChange('dataText', event.target.value)}
            className="w-full rounded-[3px] border border-slate-300 bg-[#edf2f7] px-4 py-3 font-mono text-sm outline-none focus:border-sky-400"
          />
        </Field>

        <label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
          <input
            type="checkbox"
            checked={Boolean(draft.is_active)}
            onChange={(event) => onChange('is_active', event.target.checked)}
            className="h-4 w-4 accent-cyan-500"
          />
          Publish section on live site
        </label>

        <div className="flex flex-wrap gap-3">
          <PrimaryButton type="submit" tone="red" disabled={saving}>
            {saving ? 'Saving...' : 'Save Details'}
          </PrimaryButton>
          <PrimaryButton type="button" tone="white" onClick={onClose}>
            Cancel
          </PrimaryButton>
        </div>
      </form>
    </Modal>
  )
}

function formatCount(value) {
  return String(value).padStart(2, '0')
}

export default function AdminDashboardPage({ onNavigate, adminUser, ready, path }) {
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [editorOpen, setEditorOpen] = useState(false)
  const [editorTitle, setEditorTitle] = useState('Add New Medicine')
  const [editorGroupLabel, setEditorGroupLabel] = useState('')
  const [draft, setDraft] = useState(createDraft())

  const route = useMemo(() => getRouteInfo(path), [path])

  const loadSections = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const response = await api.listAdminSections()
      setSections(response.data ?? [])
    } catch (requestError) {
      setError(requestError.message)
      if (requestError.message.toLowerCase().includes('unauthenticated')) {
        onNavigate('/admin/login')
      }
    } finally {
      setLoading(false)
    }
  }, [onNavigate])

  useEffect(() => {
    if (!ready) return

    if (!api.getToken()) {
      onNavigate('/admin/login')
      return
    }

    loadSections()
  }, [loadSections, onNavigate, ready])

  const groupRows = useMemo(
    () =>
      SECTION_GROUPS.map((group) => {
        const items = sections.filter((section) => getSectionGroup(section) === group.key)
        return {
          key: group.key,
          label: group.label,
          count: items.length,
          items,
        }
      }),
    [sections],
  )

  const medicineRows = useMemo(() => {
    return sections.map((section) => ({
      ...section,
      medicineName: section.label,
      medicineId: fakeMedicineId(section),
      groupName: getGroupLabel(getSectionGroup(section)),
      stockQty: fakeStock(section),
      payloadCount: countPayloadEntries(section),
    }))
  }, [sections])

  const visibleMedicineRows = useMemo(() => {
    const query = search.trim().toLowerCase()
    const selectedGroup = route.page === 'group-detail' ? route.key : null

    return medicineRows.filter((row) => {
      const matchesQuery =
        !query ||
        [row.medicineName, row.medicineId, row.groupName, row.section_type, row.description]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query))

      if (route.page === 'group-detail') {
        return getSectionGroup(row) === selectedGroup && matchesQuery
      }

      return matchesQuery
    })
  }, [medicineRows, route.key, route.page, search])

  const selectedSection = useMemo(() => {
    if (route.page === 'medicine-detail') {
      return sections.find((section) => section.key === route.key) ?? null
    }

    if (route.page === 'group-detail') {
      return sections.find((section) => getSectionGroup(section) === route.key) ?? null
    }

    return null
  }, [route.key, route.page, sections])

  const counts = useMemo(
    () => ({
      total: sections.length,
      active: sections.filter((section) => section.is_active).length,
      hidden: sections.filter((section) => !section.is_active).length,
      groups: SECTION_GROUPS.length,
    }),
    [sections],
  )

  const topClock = useMemo(() => formatClock(new Date()), [])

  const openCreate = useCallback(
    (preset = {}) => {
      const nextSectionType = preset.section_type ?? preset.groupKey ?? 'section'
      setDraft(
        createDraft({
          section_type: nextSectionType,
          sort_order: preset.sort_order ?? 0,
          is_active: true,
        }),
      )
      setEditorGroupLabel(preset.groupLabel || '')
      setEditorTitle(preset.title || 'Add New Medicine')
      setEditorOpen(true)
    },
    [],
  )

  const openEdit = useCallback((section) => {
    setDraft(createDraft(clone(section)))
    setEditorTitle('Add New Medicine')
    setEditorGroupLabel(getGroupLabel(getSectionGroup(section)))
    setEditorOpen(true)
  }, [])

  const closeEditor = useCallback(() => {
    setEditorOpen(false)
    setDraft(createDraft())
    setEditorGroupLabel('')
  }, [])

  const saveSection = useCallback(
    async (event) => {
      event.preventDefault()
      setSaving(true)
      setError('')
      setInfo('')

      try {
        let dataPayload
        try {
          dataPayload = JSON.parse(draft.dataText || '{}')
        } catch {
          throw new Error('JSON data must be valid JSON.')
        }

        const payload = {
          key: draft.key.trim(),
          label: draft.label.trim(),
          description: draft.description.trim(),
          section_type: draft.section_type.trim(),
          sort_order: Number.parseInt(draft.sort_order, 10) || 0,
          is_active: Boolean(draft.is_active),
          data: dataPayload,
        }

        const response = draft.id ? await api.updateSection(draft.id, payload) : await api.createSection(payload)
        const saved = response.data

        setSections((current) => {
          const next = draft.id
            ? current.map((item) => (item.id === saved.id ? saved : item))
            : [...current, saved]

          return next.sort((left, right) => left.sort_order - right.sort_order)
        })

        setInfo(response.message || 'Section saved successfully.')
        closeEditor()

        if (route.page === 'medicine-detail') {
          onNavigate(`/admin/inventory/sections/${encodeURIComponent(saved.key)}`)
        }
      } catch (requestError) {
        setError(requestError.message)
        if (requestError.message.toLowerCase().includes('unauthenticated')) {
          onNavigate('/admin/login')
        }
      } finally {
        setSaving(false)
      }
    },
    [closeEditor, draft, onNavigate, route.page],
  )

  const deleteSection = useCallback(
    async (section) => {
      if (!window.confirm(`Delete "${section.label}"?`)) return

      setSaving(true)
      setError('')
      setInfo('')

      try {
        await api.deleteSection(section.id)
        setSections((current) => current.filter((item) => item.id !== section.id))
        setInfo('Section deleted successfully.')
        onNavigate('/admin/inventory/sections')
      } catch (requestError) {
        setError(requestError.message)
      } finally {
        setSaving(false)
      }
    },
    [onNavigate],
  )

  const logout = useCallback(async () => {
    try {
      await api.logoutAdmin()
    } finally {
      api.setToken(null)
      onNavigate('/admin/login')
    }
  }, [onNavigate])

  const menuActive = useCallback(
    (target) => {
      if (target === '/admin' && route.page === 'dashboard') return true
      if (target === '/admin/inventory/sections' && ['medicine-list', 'medicine-detail'].includes(route.page)) return true
      if (target === '/admin/inventory/groups' && ['group-list', 'group-detail'].includes(route.page)) return true
      if (target === '/admin/reports' && route.page === 'reports') return true
      if (target === '/admin/configuration' && route.page === 'configuration') return true
      if (PLACEHOLDER_ROUTES.has(target) && route.page === 'placeholder' && route.path === target) return true
      return false
    },
    [route.page, route.path],
  )

  const currentTitle =
    route.page === 'dashboard'
      ? 'Dashboard'
      : route.page === 'medicine-list'
        ? 'Inventory'
        : route.page === 'group-list'
          ? 'Inventory'
          : route.page === 'medicine-detail'
            ? selectedSection?.label || 'Medicine Details'
            : route.page === 'group-detail'
              ? `${getGroupLabel(route.key)} (${formatCount((groupRows.find((group) => group.key === route.key)?.count ?? 0))})`
              : route.page === 'reports'
                ? 'Reports'
                : route.page === 'configuration'
                  ? 'Configurations'
                  : 'Admin'

  const currentSubtitle =
    route.page === 'dashboard'
      ? 'A quick data overview of the inventory.'
      : route.page === 'medicine-list'
        ? 'List of medicines available for sales.'
        : route.page === 'group-list'
          ? 'List of medicine groups.'
          : route.page === 'medicine-detail'
            ? 'List of medicines available for sales.'
            : route.page === 'group-detail'
              ? 'Detailed view of a medicine group.'
              : route.page === 'reports'
                ? 'Overall reports related to the pharmacy.'
                : route.page === 'configuration'
                  ? 'Configure your pharmacy application.'
                  : 'This section is wired into the shared admin shell.'

  const openDetails = (section) => {
    onNavigate(`/admin/inventory/sections/${encodeURIComponent(section.key)}`)
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-[-0.05em] text-slate-900">Inventory</h1>
          <p className="text-sm text-slate-500">List of medicines available for sales.</p>
        </div>
        <PrimaryButton type="button" tone="red" onClick={() => openCreate({ title: 'Add New Item' })}>
          + Add New Item
        </PrimaryButton>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Medicines Available"
          value={formatCount(Math.max(counts.total, 298))}
          subtitle=""
          accent="blue"
          footer="View Full List  >>"
          onClick={() => onNavigate('/admin/inventory/sections')}
        />
        <StatCard
          title="Medicine Groups"
          value={formatCount(Math.max(counts.groups, 2))}
          subtitle=""
          accent="green"
          footer="View Groups  >>"
          onClick={() => onNavigate('/admin/inventory/groups')}
        />
        <StatCard
          title="Medicine Shortage"
          value="01"
          subtitle=""
          accent="red"
          footer="Resolve Now  >>"
          onClick={() => onNavigate('/admin/reports')}
        />
        <StatCard
          title="Inventory Status"
          value="Good"
          subtitle=""
          accent="yellow"
          footer="View Detailed Report  >>"
          onClick={() => onNavigate('/admin/reports')}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Panel
          title="Inventory"
          subtitle="Quick overview of the live sections."
          action={<button type="button" className="text-xs font-semibold text-slate-500">Go to Configuration  &gt;&gt;</button>}
        >
          <div className="grid grid-cols-2 gap-0">
            <div className="border-r border-b border-slate-200 p-5">
              <p className="text-[13px] font-semibold text-slate-800">298</p>
              <p className="text-xs text-slate-500">Total no of Medicines</p>
            </div>
            <div className="border-b border-slate-200 p-5">
              <p className="text-[13px] font-semibold text-slate-800">24</p>
              <p className="text-xs text-slate-500">Medicine Groups</p>
            </div>
            <div className="border-r border-slate-200 p-5">
              <p className="text-[13px] font-semibold text-slate-800">04</p>
              <p className="text-xs text-slate-500">Total no of Suppliers</p>
            </div>
            <div className="p-5">
              <p className="text-[13px] font-semibold text-slate-800">05</p>
              <p className="text-xs text-slate-500">Total no of Users</p>
            </div>
          </div>
        </Panel>

        <Panel
          title="Quick Report"
          subtitle="Monthly summary cards."
          action={<button type="button" className="text-xs font-semibold text-slate-500">January 2022</button>}
        >
          <div className="grid grid-cols-2 gap-0">
            <div className="border-r border-b border-slate-200 p-5">
              <p className="text-[13px] font-semibold text-slate-800">70,856</p>
              <p className="text-xs text-slate-500">Qty of Medicines Sold</p>
            </div>
            <div className="border-b border-slate-200 p-5">
              <p className="text-[13px] font-semibold text-slate-800">5,288</p>
              <p className="text-xs text-slate-500">Invoices Generated</p>
            </div>
            <div className="border-r border-slate-200 p-5">
              <p className="text-[13px] font-semibold text-slate-800">845</p>
              <p className="text-xs text-slate-500">Total no of Customers</p>
            </div>
            <div className="p-5">
              <p className="text-[13px] font-semibold text-slate-800">Adalimumab</p>
              <p className="text-xs text-slate-500">Frequently bought item</p>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  )

  const renderMedicineList = () => (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">Inventory</p>
          <h1 className="text-[28px] font-extrabold tracking-[-0.05em] text-slate-900">
            List of Medicines ({formatCount(counts.total)})
          </h1>
          <p className="text-sm text-slate-500">List of medicines available for sales.</p>
        </div>
        <PrimaryButton type="button" tone="red" onClick={() => openCreate({ title: 'Add New Item' })}>
          + Add New Item
        </PrimaryButton>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <SearchField value={search} onChange={setSearch} placeholder="Search Medicine Inventory.." className="w-full max-w-[260px]" />
        <select className="h-9 w-full max-w-[220px] rounded-[3px] border border-slate-300 bg-white px-3 text-sm text-slate-600 outline-none">
          <option>- Select Group -</option>
          {SECTION_GROUPS.map((group) => (
            <option key={group.key}>{group.label}</option>
          ))}
        </select>
      </div>

      <Panel title="Inventory" subtitle="Showing all medicines in the system.">
        {loading ? (
          <div className="px-5 py-10 text-sm text-slate-500">Loading medicines...</div>
        ) : (
          <>
            <Table
              columns={['Medicine Name', 'Medicine ID', 'Group Name', 'Stock in Qty', 'Action']}
              rows={visibleMedicineRows}
              rowKey={(row) => row.id}
              onRowClick={openDetails}
              renderRow={(row) => (
                <>
                  <td className="px-5 py-4">
                    <div className="text-sm font-semibold text-slate-800">{row.medicineName}</div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">{row.medicineId}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{row.groupName}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{row.stockQty}</td>
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        openDetails(row)
                      }}
                      className="text-sm font-semibold text-slate-700"
                    >
                      View Full Detail  &gt;&gt;
                    </button>
                  </td>
                </>
              )}
            />
            <div className="flex items-center justify-between border-t border-slate-200 px-5 py-3 text-sm text-slate-500">
              <span>Showing 1 - 8 results of {counts.total}</span>
              <span>Page 01</span>
            </div>
          </>
        )}
      </Panel>
    </div>
  )

  const renderMedicineDetail = () => {
    const section = selectedSection

    if (!section) {
      return (
        <Panel title="Medicine Details" subtitle="The selected record could not be found.">
          <div className="px-5 py-8 text-sm text-slate-500">Medicine not found.</div>
        </Panel>
      )
    }

    const groupLabel = getGroupLabel(getSectionGroup(section))

    return (
      <div className="space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500">Inventory &gt; List of Medicines</p>
            <h1 className="text-[28px] font-extrabold tracking-[-0.05em] text-slate-900">{section.label}</h1>
            <p className="text-sm text-slate-500">List of medicines available for sales.</p>
          </div>
          <PrimaryButton type="button" tone="blue" onClick={() => openEdit(section)}>
            Edit Details
          </PrimaryButton>
        </div>

        <SearchField
          value={search}
          onChange={setSearch}
          placeholder="Search in Medicine Details"
          className="w-full max-w-[260px]"
        />

        <div className="grid gap-4 xl:grid-cols-[1fr_1.1fr]">
          <Panel title="Medicine" subtitle="Core item details.">
            <div className="grid grid-cols-2 gap-0">
              <div className="border-r border-b border-slate-200 p-5">
                <p className="text-[13px] font-semibold text-slate-800">{formatCount(section.id)}</p>
                <p className="text-xs text-slate-500">Medicine ID</p>
              </div>
              <div className="border-b border-slate-200 p-5">
                <p className="text-[13px] font-semibold text-slate-800">{formatCount(section.sort_order)}</p>
                <p className="text-xs text-slate-500">Medicine Group</p>
              </div>
              <div className="col-span-2 p-5">
                <p className="text-[13px] font-semibold text-slate-800">{groupLabel}</p>
                <p className="text-xs text-slate-500">Group Name</p>
              </div>
            </div>
          </Panel>

          <Panel title="Inventory in Qty" subtitle="Live counts and stock indicators." action={<button type="button" className="text-xs font-semibold text-slate-500">Send Stock Request  &gt;&gt;</button>}>
            <div className="grid grid-cols-3 gap-0">
              <div className="border-r border-b border-slate-200 p-5">
                <p className="text-[13px] font-semibold text-slate-800">{fakeStock(section)}</p>
                <p className="text-xs text-slate-500">Lifetime Supply</p>
              </div>
              <div className="border-r border-b border-slate-200 p-5">
                <p className="text-[13px] font-semibold text-slate-800">{Math.max(1, fakeStock(section) - 8)}</p>
                <p className="text-xs text-slate-500">Lifetime Sales</p>
              </div>
              <div className="border-b border-slate-200 p-5">
                <p className="text-[13px] font-semibold text-slate-800">{Math.max(1, 12 - section.sort_order)}</p>
                <p className="text-xs text-slate-500">Stock Left</p>
              </div>
              <div className="col-span-3 p-5 text-sm text-slate-600">
                Detailed inventory metadata based on the Laravel section payload.
              </div>
            </div>
          </Panel>
        </div>

        <Panel title="How to use" subtitle="Description">
          <div className="px-5 py-5 text-sm leading-7 text-slate-700">
            {section.description || 'No usage instructions added yet.'}
          </div>
        </Panel>

        <Panel title="Side Effects" subtitle="JSON Data">
          <pre className="overflow-auto px-5 py-5 text-sm leading-7 text-slate-700">
            {JSON.stringify(section.data ?? {}, null, 2)}
          </pre>
        </Panel>

        <div className="flex flex-wrap gap-3">
          <PrimaryButton type="button" tone="white" onClick={() => deleteSection(section)}>
            Delete Medicine
          </PrimaryButton>
          <PrimaryButton type="button" tone="red" onClick={() => openCreate({ title: 'Add New Item', groupLabel })}>
            + Add New Item
          </PrimaryButton>
          <PrimaryButton type="button" tone="blue" onClick={() => openEdit(section)}>
            Save Details
          </PrimaryButton>
        </div>
      </div>
    )
  }

  const renderGroupList = () => (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">Inventory</p>
          <h1 className="text-[28px] font-extrabold tracking-[-0.05em] text-slate-900">
            Medicine Groups ({formatCount(SECTION_GROUPS.length)})
          </h1>
          <p className="text-sm text-slate-500">List of medicines groups.</p>
        </div>
        <PrimaryButton type="button" tone="red" onClick={() => openCreate({ title: 'Add New Group' })}>
          + Add New Group
        </PrimaryButton>
      </div>

      <SearchField value={search} onChange={setSearch} placeholder="Search Medicine Groups.." className="w-full max-w-[260px]" />

      <Panel title="Medicine Groups" subtitle="Detailed view of a medicine group.">
        <Table
          columns={['Group Name', 'No of Medicines', 'Action']}
          rows={groupRows.filter((group) => {
            const query = search.trim().toLowerCase()
            return !query || group.label.toLowerCase().includes(query)
          })}
          rowKey={(row) => row.key}
          renderRow={(row) => (
            <>
              <td className="px-5 py-4 text-sm font-semibold text-slate-800">{row.label}</td>
              <td className="px-5 py-4 text-sm text-slate-600">{formatCount(row.count)}</td>
              <td className="px-5 py-4">
                <button
                  type="button"
                  onClick={() => onNavigate(`/admin/inventory/groups/${row.key}`)}
                  className="text-sm font-semibold text-slate-700"
                >
                  View Full Detail  &gt;&gt;
                </button>
              </td>
            </>
          )}
        />
      </Panel>
    </div>
  )

  const renderGroupDetail = () => {
    const meta = getGroupMeta(route.key)
    const rows = visibleMedicineRows.filter((row) => getSectionGroup(row) === meta.key)

    return (
      <div className="space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500">Inventory &gt; Medicine Groups</p>
            <h1 className="text-[28px] font-extrabold tracking-[-0.05em] text-slate-900">
              {meta.label} ({formatCount(rows.length)})
            </h1>
            <p className="text-sm text-slate-500">Detailed view of a medicine group.</p>
          </div>
          <PrimaryButton type="button" tone="red" onClick={() => openCreate({ title: 'Add Medicine', groupKey: meta.key, groupLabel: meta.label })}>
            + Add Medicine
          </PrimaryButton>
        </div>

        <SearchField value={search} onChange={setSearch} placeholder="Search for Medicine" className="w-full max-w-[260px]" />

        <Panel title={meta.label} subtitle="All medicines that belong to this group.">
          <Table
            columns={['Medicine Name', 'No of Medicines', 'Action']}
            rows={rows}
            rowKey={(row) => row.id}
            renderRow={(row) => (
              <>
                <td className="px-5 py-4 text-sm font-semibold text-slate-800">{row.medicineName}</td>
                <td className="px-5 py-4 text-sm text-slate-600">{formatCount(row.payloadCount || 0)}</td>
                <td className="px-5 py-4">
                  <button
                    type="button"
                    onClick={() => deleteSection(row)}
                    className="text-sm font-semibold text-[#ff5a52]"
                  >
                    Remove from Group
                  </button>
                </td>
              </>
            )}
          />
        </Panel>

        <div className="flex flex-wrap gap-3">
          <PrimaryButton type="button" tone="white" onClick={() => deleteSection(rows[0] ?? selectedSection)}>
            Delete Group
          </PrimaryButton>
        </div>
      </div>
    )
  }

  const renderReports = () => (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-[28px] font-extrabold tracking-[-0.05em] text-slate-900">Reports</h1>
          <p className="text-sm text-slate-500">Overall reports related to the pharmacy.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Sales Report" value="Rs. 8,55,875" subtitle="" accent="yellow" footer="View Detailed Report  >>" />
        <StatCard title="Payment Report" value="523" subtitle="" accent="green" footer="View Detailed Report  >>" />
        <StatCard title="Medicines Available" value={formatCount(Math.max(counts.total, 298))} subtitle="" accent="blue" footer="Visit Inventory  >>" />
        <StatCard title="Medicine Shortage" value="01" subtitle="" accent="red" footer="Resolve Now  >>" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Panel title="Sales Made" subtitle="">
          <div className="relative min-h-[220px] bg-gradient-to-b from-sky-50 to-white px-5 py-5">
            <div className="absolute inset-x-5 top-16 border-t border-dashed border-slate-300" />
            <div className="absolute inset-x-5 top-28 border-t border-dashed border-slate-300" />
            <div className="absolute inset-x-5 top-40 border-t border-dashed border-slate-300" />
            <div className="absolute left-5 right-5 top-12 h-[130px] rounded-[8px] border border-sky-300 bg-sky-100/40" />
            <div className="absolute left-8 top-20 h-[70px] w-[70px] rounded-full border-4 border-sky-400/20 bg-sky-400/30" />
            <div className="absolute left-20 top-28 h-[110px] w-[110px] rounded-full border-4 border-sky-400/20 bg-sky-400/20" />
            <div className="absolute right-20 top-32 h-[82px] w-[82px] rounded-full border-4 border-sky-400/25 bg-sky-400/25" />
            <div className="absolute bottom-5 left-6 text-xs text-slate-500">1 Dec</div>
            <div className="absolute bottom-5 left-28 text-xs text-slate-500">8 Dec</div>
            <div className="absolute bottom-5 left-52 text-xs text-slate-500">16 Dec</div>
            <div className="absolute bottom-5 right-8 text-xs text-slate-500">31 Dec</div>
            <div className="absolute left-[53%] top-[88px] rounded-full bg-sky-500 px-3 py-2 text-xs font-semibold text-white shadow">
              146
            </div>
          </div>
        </Panel>

        <Panel title="Order ID" subtitle="Date & Time">
          <div className="max-h-[290px] overflow-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="sticky top-0 bg-white">
                <tr>
                  <th className="border-b border-slate-200 px-5 py-3">Order ID</th>
                  <th className="border-b border-slate-200 px-5 py-3">Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['2486558485948', '01 Dec 2021 10:25'],
                  ['2485585485877', '02 Dec 2021 18:25'],
                  ['2485585485833', '03 Dec 2021 18:25'],
                  ['2485585485858', '05 Dec 2021 18:25'],
                  ['2485585485868', '09 Dec 2021 18:25'],
                  ['2485585485857', '10 Dec 2021 18:25'],
                  ['2485585485844', '15 Dec 2021 18:25'],
                  ['2485585485444', '21 Dec 2021 18:25'],
                ].map(([orderId, date]) => (
                  <tr key={orderId} className="border-b border-slate-100">
                    <td className="px-5 py-3 text-slate-700">{orderId}</td>
                    <td className="px-5 py-3 text-slate-700">{date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </div>
  )

  const renderConfiguration = () => (
    <div className="space-y-5">
      <div>
        <h1 className="text-[28px] font-extrabold tracking-[-0.05em] text-slate-900">Configurations</h1>
        <p className="text-sm text-slate-500">Configure your pharmacy application.</p>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Panel title="Branding" subtitle="">
          <div className="grid grid-cols-2 gap-0">
            <div className="border-r border-b border-slate-200 p-5">
              <p className="text-sm font-semibold text-slate-800">Enter Name</p>
              <p className="text-xs text-slate-500">Pharmacy Name</p>
            </div>
            <div className="border-b border-slate-200 p-5 text-right">
              <p className="text-sm font-semibold text-slate-800">PH349TY228</p>
              <p className="text-xs text-slate-500">Pharmacy ID</p>
            </div>
            <div className="col-span-2 p-5">
              <p className="text-sm font-semibold text-slate-800">MedicaShop</p>
              <p className="text-xs text-slate-500">Brand identity</p>
            </div>
          </div>
        </Panel>

        <Panel title="Owner" subtitle="">
          <div className="grid grid-cols-2 gap-0">
            <div className="border-r border-b border-slate-200 p-5">
              <p className="text-sm font-semibold text-slate-800">Enter Name</p>
              <p className="text-xs text-slate-500">Owner Name</p>
            </div>
            <div className="border-b border-slate-200 p-5 text-right">
              <p className="text-sm font-semibold text-slate-800">{adminUser?.email || 'user@mail.com'}</p>
              <p className="text-xs text-slate-500">Email ID</p>
            </div>
            <div className="col-span-2 p-5">
              <p className="text-sm font-semibold text-slate-800">{adminUser?.name || 'Admin User'}</p>
              <p className="text-xs text-slate-500">Owner details</p>
            </div>
          </div>
        </Panel>
      </div>

      <Panel title="Page" subtitle="Action">
        <Table
          columns={['Page', 'Action']}
          rows={['Dashboard', 'Inventory', 'Reports', 'Configuration', 'Contact Management', 'Notifications'].map((page) => ({
            page,
          }))}
          rowKey={(row) => row.page}
          renderRow={(row) => (
            <>
              <td className="px-5 py-4 text-sm font-semibold text-slate-800">{row.page}</td>
              <td className="px-5 py-4 text-sm font-semibold text-sky-600">+ Add Sub Page</td>
            </>
          )}
        />
      </Panel>
    </div>
  )

  const renderPlaceholder = () => (
    <Panel title="Coming Soon" subtitle="This route is wired and ready for future screens.">
      <div className="px-5 py-10 text-sm text-slate-600">
        {route.path || 'This page'} is reserved for the next admin view.
      </div>
    </Panel>
  )

  return (
    <section className="min-h-screen bg-[#e9eef4] text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-[248px] shrink-0 flex-col bg-[#1f2937] text-white lg:flex">
          <div className="flex h-14 items-center gap-3 border-b border-white/10 px-5">
            <div className="relative grid h-8 w-8 place-items-center">
              <span className="absolute left-0 top-0 h-3 w-3 rounded-[2px] border-2 border-[#f4b400] bg-transparent" />
              <span className="absolute left-4 top-4 h-3 w-3 rounded-[2px] border-2 border-cyan-400 bg-transparent" />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-[2px] border-2 border-[#f4b400] bg-transparent" />
            </div>
            <p className="text-sm font-bold leading-none">Pharma One</p>
          </div>

          <div className="border-b border-white/10 px-4 py-4">
            <div className="flex items-center gap-3 rounded-[4px] bg-white/5 p-2">
              <div className="grid h-10 w-10 place-items-center rounded-[4px] bg-amber-200 text-sm font-black text-slate-900">
                {initials(adminUser?.name || 'Subash')}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{adminUser?.name || 'Subash'}</p>
                <p className="text-xs text-[#8ee8af]">Super Admin</p>
              </div>
              <div className="ml-auto text-white/50">...</div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto py-3">
            <ShellButton active={route.page === 'dashboard'} onClick={() => onNavigate('/admin')} icon="DB" label="Dashboard" />

            <SidebarSection title="Inventory">
              <ShellButton active={route.page === 'medicine-list'} onClick={() => onNavigate('/admin/inventory/sections')} icon="IN" label="List of Medicines" />
              <ShellButton active={route.page === 'group-list'} onClick={() => onNavigate('/admin/inventory/groups')} nested icon="MG" label="Medicine Groups" />
            </SidebarSection>

            <SidebarSection title="Reports">
              <ShellButton active={route.page === 'reports'} onClick={() => onNavigate('/admin/reports')} icon="RP" label="Reports" />
            </SidebarSection>

            <ShellButton active={route.page === 'configuration'} onClick={() => onNavigate('/admin/configuration')} icon="CF" label="Configuration" />

            <SidebarSection title="More">
              {NAV_ITEMS.slice(4).map((item) => (
                <ShellButton key={item.path} active={menuActive(item.path)} onClick={() => onNavigate(item.path)} icon={item.icon} label={item.label} />
              ))}
            </SidebarSection>
          </nav>

          <div className="border-t border-white/10 px-4 py-3 text-[11px] text-white/40">Powered by Subash 2022</div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="border-b border-slate-200 bg-white">
            <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
              <SearchField value={search} onChange={setSearch} placeholder="Search for anything here.." className="w-full max-w-[350px]" />

              <div className="ml-auto hidden items-center gap-6 md:flex">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="text-lg">EN</span>
                  <span>English (US)</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-800">Good Morning</p>
                  <p className="text-xs text-slate-500">{topClock}</p>
                </div>
              </div>
            </div>
          </header>

          <main className="p-4 lg:p-6">
            <div className="mx-auto max-w-[1360px]">
              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">Inventory</p>
                  <h1 className="text-[28px] font-extrabold tracking-[-0.05em] text-slate-900">{currentTitle}</h1>
                  <p className="text-sm text-slate-500">{currentSubtitle}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <PrimaryButton type="button" tone="red" onClick={() => openCreate({ title: 'Add New Item' })}>
                    + Add New Item
                  </PrimaryButton>
                  <PrimaryButton type="button" tone="white" onClick={loadSections}>
                    Refresh
                  </PrimaryButton>
                  <PrimaryButton type="button" tone="white" onClick={logout}>
                    Logout
                  </PrimaryButton>
                </div>
              </div>

              {error ? (
                <div className="mb-4 rounded-[4px] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </div>
              ) : null}

              {info ? (
                <div className="mb-4 rounded-[4px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {info}
                </div>
              ) : null}

              {route.page === 'dashboard' ? renderDashboard() : null}
              {route.page === 'medicine-list' ? renderMedicineList() : null}
              {route.page === 'medicine-detail' ? renderMedicineDetail() : null}
              {route.page === 'group-list' ? renderGroupList() : null}
              {route.page === 'group-detail' ? renderGroupDetail() : null}
              {route.page === 'reports' ? renderReports() : null}
              {route.page === 'configuration' ? renderConfiguration() : null}
              {route.page === 'placeholder' ? renderPlaceholder() : null}
            </div>
          </main>
        </div>
      </div>

      <SectionEditorModal
        open={editorOpen}
        draft={draft}
        title={editorTitle}
        groupLabel={editorGroupLabel}
        onClose={closeEditor}
        onChange={(field, value) => setDraft((current) => ({ ...current, [field]: value }))}
        onSave={saveSection}
        saving={saving}
      />
    </section>
  )
}
