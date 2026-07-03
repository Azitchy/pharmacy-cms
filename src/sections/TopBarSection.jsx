import { topBarItems } from '../data/pharmacyData'

export default function TopBarSection({ content }) {
  const items = content?.items ?? topBarItems

  return (
    <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-[13px] text-white/90">
      <div className="mx-auto flex min-h-[34px] w-[min(1180px,calc(100%-32px))] items-center justify-between gap-4">
        <span>{items[0]}</span>
        <div className="flex flex-wrap gap-5">
          <span>{items[1]}</span>
          <span>{items[2]}</span>
        </div>
      </div>
    </div>
  )
}
