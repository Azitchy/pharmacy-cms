import { topBarItems } from '../data/pharmacyData'

export default function TopBarSection() {
  return (
    <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-[13px] text-white/90">
      <div className="mx-auto flex min-h-[34px] w-[min(1180px,calc(100%-32px))] items-center justify-between gap-4">
        <span>{topBarItems[0]}</span>
        <div className="flex flex-wrap gap-5">
          <span>{topBarItems[1]}</span>
          <span>{topBarItems[2]}</span>
        </div>
      </div>
    </div>
  )
}
