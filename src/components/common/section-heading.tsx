import { ReactNode } from 'react'

type SectionHeadingProps = {
  id?: string
  eyebrow?: string
  title: string
  description?: ReactNode
}

export function SectionHeading({ id, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div id={id} className="max-w-3xl">
      {eyebrow ? <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">{eyebrow}</p> : null}
      <h2 className="section-title">{title}</h2>
      {description ? <div className="section-subtitle">{description}</div> : null}
    </div>
  )
}
