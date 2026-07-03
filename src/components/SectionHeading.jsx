export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={align === 'center' ? 'text-center' : ''}>
      {eyebrow ? (
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-500">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-[clamp(28px,3vw,46px)] font-extrabold tracking-[-0.05em] text-slate-800">
        {title}
      </h2>
      {description ? (
        <p
          className={[
            'mt-3 max-w-[520px] text-[15px] leading-7 text-slate-500',
            align === 'center' ? 'mx-auto' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
