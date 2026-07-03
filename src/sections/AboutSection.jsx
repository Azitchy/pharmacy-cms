import SectionHeading from '../components/SectionHeading'
import { heroStats } from '../data/pharmacyData'

export default function AboutSection() {
  return (
    <section className="pt-17 py-[68px]">
      <div className="mx-auto w-[min(1180px,calc(100%-32px))]">
        <div className="grid items-center gap-7 rounded-[30px] bg-white p-8 shadow-[0_18px_46px_rgba(17,78,68,0.08)] lg:grid-cols-[1fr_1.12fr]">
          <div>
            <SectionHeading
              eyebrow="Who we are"
              title="With us, expect more than just a pharmacy."
              description="We keep the layout clean and the trust signals visible so the page feels like the reference screenshot without leaning on stock imagery."
            />
            <div className="mt-6 grid grid-cols-3 gap-4 max-md:grid-cols-1">
              {heroStats.map((stat) => (
                <div key={stat.label} className="rounded-[18px] bg-slate-50 p-4">
                  <strong className="block text-[28px] leading-none text-emerald-500">
                    {stat.value}
                  </strong>
                  <span className="text-sm text-slate-500">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="min-h-[360px]">
            <div className="relative h-full min-h-[360px]">
              <div className="absolute inset-[18px_0_0_26px] rounded-[24px] bg-[linear-gradient(135deg,#55c2bb,#e5f0e9_58%,#e6c8a8)] shadow-[0_18px_36px_rgba(17,78,68,0.12)]" />
              <div className="absolute bottom-0 left-0 h-[82%] w-[44%] rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.44),rgba(255,255,255,0.12)),linear-gradient(135deg,#ffffff,#d2ebe7_44%,#8ccfc7)] shadow-[0_20px_36px_rgba(17,78,68,0.12)]" />
              <div className="absolute bottom-0 right-[14px] h-[82%] w-[44%] rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.34),rgba(255,255,255,0.04)),linear-gradient(135deg,#dbe5f2,#f4f9fb_52%,#c8dee9)] shadow-[0_20px_36px_rgba(17,78,68,0.12)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
