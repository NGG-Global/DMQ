import type { ChoiceField, TextField } from '../data/questions'
import { OTHER_MAX } from '../data/questions'
import type { ChoiceAnswer } from '../types'

interface FieldShellProps {
  index: number
  title: string
  prompt: string
  children: React.ReactNode
}

/** מעטפת אחידה לכל שדה: מספר, כותרת סעיף וטקסט השאלה */
function FieldShell({ index, title, prompt, children }: FieldShellProps) {
  return (
    <section className="rounded-3xl bg-white p-5 shadow-card sm:p-6">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-deep text-sm font-bold text-white">
          {index}
        </span>
        <div className="flex-1">
          <h2 className="text-right text-lg font-bold text-navy-deep">{title}</h2>
          <p className="mt-1 text-right text-sm leading-relaxed text-ink/70">{prompt}</p>
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  )
}

interface ChoiceProps {
  index: number
  field: ChoiceField
  value: ChoiceAnswer
  onChange: (next: ChoiceAnswer) => void
}

export function ChoiceFieldInput({ index, field, value, onChange }: ChoiceProps) {
  const toggle = (option: string) => {
    const selected = value.selected.includes(option)
      ? value.selected.filter((o) => o !== option)
      : [...value.selected, option]
    onChange({ ...value, selected })
  }

  const otherActive = value.other.length > 0

  return (
    <FieldShell index={index} title={field.title} prompt={field.question}>
      <div className="flex flex-wrap gap-2">
        {field.options.map((option) => {
          const active = value.selected.includes(option)
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(option)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition
                ${
                  active
                    ? 'border-sky bg-sky text-white shadow-pill'
                    : 'border-navy-deep/15 bg-surface text-ink hover:border-sky/50'
                }`}
            >
              {option}
            </button>
          )
        })}
      </div>

      {/* שדה "אחר" — עד 50 תווים */}
      <div className="mt-3">
        <div
          className={`flex items-center gap-2 rounded-2xl border px-3 py-2 transition
            ${otherActive ? 'border-sky bg-white' : 'border-navy-deep/15 bg-surface'}`}
        >
          <span className="shrink-0 text-sm font-semibold text-ink/70">אחר:</span>
          <input
            type="text"
            dir="rtl"
            value={value.other}
            maxLength={OTHER_MAX}
            onChange={(e) => onChange({ ...value, other: e.target.value })}
            placeholder="פירוט קצר…"
            className="w-full bg-transparent text-right text-sm text-ink placeholder:text-ink/40 focus:outline-none"
          />
        </div>
        <div className="mt-1 text-left text-xs text-ink/40">
          {value.other.length}/{OTHER_MAX}
        </div>
      </div>
    </FieldShell>
  )
}

interface TextProps {
  index: number
  field: TextField
  value: string
  onChange: (next: string) => void
}

export function TextFieldInput({ index, field, value, onChange }: TextProps) {
  return (
    <FieldShell index={index} title={field.title} prompt={field.question}>
      <textarea
        dir="rtl"
        rows={field.maxLength > 120 ? 3 : 2}
        value={value}
        maxLength={field.maxLength}
        onChange={(e) => onChange(e.target.value)}
        placeholder="כתוב.י כאן…"
        className="w-full resize-none rounded-2xl border border-navy-deep/15 bg-surface px-4 py-3
                   text-right text-base text-ink placeholder:text-ink/40
                   focus:border-sky focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky/30"
      />
      <div className="mt-1 flex items-center justify-between">
        {field.hints && field.hints.length > 0 ? (
          <p className="text-right text-xs leading-relaxed text-ink/45">
            לדוגמה: {field.hints.join(' · ')}
          </p>
        ) : (
          <span />
        )}
        <span className="shrink-0 pr-3 text-left text-xs text-ink/40">
          {value.length}/{field.maxLength}
        </span>
      </div>
    </FieldShell>
  )
}
