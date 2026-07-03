import { useCallback, useEffect, useMemo, useState } from 'react'
import { api } from '../lib/api'
import { defaultSiteContent } from '../lib/siteContent'

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function createDraft(section) {
  if (!section) {
    return {
      id: null,
      key: '',
      label: '',
      section_type: 'section',
      description: '',
      sort_order: 0,
      is_active: true,
      data: {},
    }
  }

  return clone(section)
}

export default function AdminDashboardPage({ onNavigate }) {
  const [sections, setSections] = useState([])
  const [selectedKey, setSelectedKey] = useState('')
  const [draft, setDraft] = useState(createDraft())
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')

  const selectedSection = useMemo(
    () => sections.find((section) => section.key === selectedKey) ?? null,
    [sections, selectedKey],
  )

  const loadSections = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const response = await api.listAdminSections()
      const items = response.data ?? []
      setSections(items)
      const firstItem = items[0] ?? null
      setSelectedKey(firstItem?.key ?? '')
      setDraft(createDraft(firstItem))
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
    if (!api.getToken()) {
      onNavigate('/admin/login')
      return
    }

    loadSections()
  }, [loadSections, onNavigate])

  useEffect(() => {
    if (!selectedSection) {
      return
    }

    setDraft(createDraft(selectedSection))
  }, [selectedSection])

  const updateDraft = (field, value) => {
    setDraft((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const updateDraftData = (jsonText) => {
    setDraft((current) => ({
      ...current,
      data: jsonText,
    }))
  }

  const saveSection = async (event) => {
    event.preventDefault()
    setError('')
    setInfo('')
    setSaving(true)

    try {
      const parsedData =
        typeof draft.data === 'string' ? JSON.parse(draft.data || '{}') : draft.data ?? {}
      const payload = {
        key: draft.key.trim(),
        label: draft.label.trim(),
        section_type: draft.section_type.trim(),
        description: draft.description.trim(),
        sort_order: Number.parseInt(draft.sort_order ?? 0, 10) || 0,
        is_active: Boolean(draft.is_active),
        data: parsedData,
      }

      let response
      if (draft.id) {
        response = await api.updateSection(draft.id, payload)
      } else {
        response = await api.createSection(payload)
      }

      const updatedSection = response.data
      const nextSections = draft.id
        ? sections.map((section) => (section.id === updatedSection.id ? updatedSection : section))
        : [...sections, updatedSection]

      setSections(nextSections.sort((left, right) => left.sort_order - right.sort_order))
      setSelectedKey(updatedSection.key)
      setDraft(createDraft(updatedSection))
      setInfo(response.message ?? 'Section saved.')
    } catch (requestError) {
      setError(requestError.message)
      if (requestError.message.toLowerCase().includes('unauthenticated')) {
        onNavigate('/admin/login')
      }
    } finally {
      setSaving(false)
    }
  }

  const deleteSection = async () => {
    if (!draft.id) {
      return
    }

    if (!window.confirm(`Delete section "${draft.label}"?`)) {
      return
    }

    setError('')
    setInfo('')
    setSaving(true)

    try {
      await api.deleteSection(draft.id)
      const nextSections = sections.filter((section) => section.id !== draft.id)
      setSections(nextSections)
      const nextFirst = nextSections[0] ?? null
      setSelectedKey(nextFirst?.key ?? '')
      setDraft(createDraft(nextFirst))
      setInfo('Section deleted successfully.')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setSaving(false)
    }
  }

  const logout = useCallback(async () => {
    try {
      await api.logoutAdmin()
    } finally {
      api.setToken(null)
      onNavigate('/admin/login')
    }
  }, [onNavigate])

  const createNewSection = () => {
    const next = createDraft({
      id: null,
      key: `new-section-${sections.length + 1}`,
      label: 'New Section',
      section_type: 'section',
      description: '',
      sort_order: sections.length + 1,
      is_active: true,
      data: clone(defaultSiteContent.hero),
    })

    setSelectedKey(next.key)
    setDraft(next)
  }

  const jsonValue = typeof draft.data === 'string' ? draft.data : JSON.stringify(draft.data ?? {}, null, 2)

  return (
    <section className="min-h-screen bg-slate-50">
      <div className="border-b border-emerald-950/5 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex w-[min(1400px,calc(100%-32px))] items-center justify-between gap-4 py-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-500">
              Admin Dashboard
            </p>
            <h1 className="text-2xl font-extrabold tracking-[-0.04em] text-slate-800">
              Homepage section manager
            </h1>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="rounded-xl bg-slate-100 px-4 py-2 font-semibold text-slate-700 transition hover:-translate-y-0.5"
            >
              View site
            </button>
            <button
              type="button"
              onClick={createNewSection}
              className="rounded-xl bg-emerald-500 px-4 py-2 font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-emerald-600"
            >
              New section
            </button>
            <button
              type="button"
              onClick={logout}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:-translate-y-0.5"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid w-[min(1400px,calc(100%-32px))] gap-6 py-6 xl:grid-cols-[320px_1fr]">
        <aside className="rounded-[24px] bg-white p-4 shadow-[0_16px_36px_rgba(17,78,68,0.08)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-slate-800">Sections</h2>
            <span className="rounded-full bg-emerald-500/12 px-3 py-1 text-xs font-bold text-emerald-700">
              {sections.length}
            </span>
          </div>

          <div className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => {
                  setSelectedKey(section.key)
                  setDraft(createDraft(section))
                }}
                className={[
                  'w-full rounded-2xl border px-4 py-3 text-left transition hover:-translate-y-0.5',
                  selectedKey === section.key
                    ? 'border-emerald-200 bg-emerald-50'
                    : 'border-slate-100 bg-slate-50',
                ].join(' ')}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold text-slate-800">{section.label}</p>
                    <p className="text-xs text-slate-500">{section.key}</p>
                  </div>
                  <span
                    className={[
                      'rounded-full px-2 py-1 text-[11px] font-bold',
                      section.is_active ? 'bg-emerald-500/12 text-emerald-700' : 'bg-slate-200 text-slate-500',
                    ].join(' ')}
                  >
                    {section.is_active ? 'Active' : 'Hidden'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <div className="rounded-[24px] bg-white p-6 shadow-[0_16px_36px_rgba(17,78,68,0.08)]">
          {loading ? (
            <div className="py-20 text-center text-slate-500">Loading sections...</div>
          ) : (
            <form onSubmit={saveSection} className="grid gap-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-500">
                    Edit section
                  </p>
                  <h2 className="text-3xl font-extrabold tracking-[-0.05em] text-slate-800">
                    {draft.label || 'New section'}
                  </h2>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={loadSections}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700"
                  >
                    Refresh
                  </button>
                  <button
                    type="button"
                    onClick={deleteSection}
                    disabled={!draft.id}
                    className="rounded-xl bg-rose-500 px-4 py-2 font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Delete
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-xl bg-emerald-500 px-4 py-2 font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {saving ? 'Saving...' : 'Save changes'}
                  </button>
                </div>
              </div>

              {error ? (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </div>
              ) : null}

              {info ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {info}
                </div>
              ) : null}

              <div className="grid gap-4 lg:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Key</span>
                  <input
                    value={draft.key}
                    onChange={(event) => updateDraft('key', event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-400"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Label</span>
                  <input
                    value={draft.label}
                    onChange={(event) => updateDraft('label', event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-400"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">
                    Section Type
                  </span>
                  <input
                    value={draft.section_type}
                    onChange={(event) => updateDraft('section_type', event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-400"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">
                    Sort Order
                  </span>
                  <input
                    type="number"
                    value={draft.sort_order}
                    onChange={(event) => updateDraft('sort_order', event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-400"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Description</span>
                <textarea
                  value={draft.description}
                  onChange={(event) => updateDraft('description', event.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-400"
                />
              </label>

              <label className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
                <input
                  type="checkbox"
                  checked={Boolean(draft.is_active)}
                  onChange={(event) => updateDraft('is_active', event.target.checked)}
                  className="h-4 w-4 accent-emerald-500"
                />
                <span className="text-sm font-semibold text-slate-700">Section visible on site</span>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Section Data JSON
                </span>
                <textarea
                  value={jsonValue}
                  onChange={(event) => updateDraftData(event.target.value)}
                  rows={22}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-950 px-4 py-3 font-mono text-sm text-slate-100 outline-none transition focus:border-emerald-400"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Edit the JSON payload to control cards, labels, hero content, products, and footer data.
                </p>
              </label>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
