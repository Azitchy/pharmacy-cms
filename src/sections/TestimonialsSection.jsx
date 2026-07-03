import SectionHeading from '../components/SectionHeading'
import { testimonials } from '../data/pharmacyData'

export default function TestimonialsSection() {
  return (
    <section className="overflow-hidden bg-[linear-gradient(rgba(28,128,115,0.2),rgba(28,128,115,0.2)),linear-gradient(135deg,#5fb0a7,#2d7c73)] py-20 text-white">
      <div className="mx-auto w-[min(1180px,calc(100%-32px))]">
        <SectionHeading
          eyebrow="Testimonial"
          title="What they say about us"
          description="We use dummy testimonials to keep the visual weight and spacing aligned with the reference."
          align="center"
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="rounded-[20px] bg-white/95 p-6 text-slate-800 shadow-[0_14px_30px_rgba(17,78,68,0.14)]">
              <p className="leading-7 text-slate-500">{testimonial.quote}</p>
              <div className="mt-5 flex items-center gap-3">
                <div
                  aria-hidden="true"
                  className="h-11 w-11 rounded-full bg-[radial-gradient(circle_at_50%_32%,#ffc8a4_0_28%,transparent_29%),linear-gradient(180deg,#f4efe6_0_35%,#d1e1df_36%_100%)]"
                />
                <div>
                  <strong className="block text-slate-800">{testimonial.name}</strong>
                  <span className="text-sm text-slate-500">{testimonial.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
