import { forwardRef } from 'react'
import { fields } from '../data/questions'
import type { ChoiceField } from '../data/questions'
import type { FormState } from '../types'
import { resolveChoices } from '../types'
import { DelekMotorsLogo, NggLogo } from './Logos'

// רוחב A4 קבוע בפיקסלים (96dpi) — מבטיח צילום עקבי בכל מכשיר.
export const DOC_WIDTH_PX = 794
export const DOC_MIN_HEIGHT_PX = 1123

interface Props {
  form: FormState
}

function blockValue(form: FormState, fieldId: string): string[] {
  switch (fieldId) {
    case 'triggers':
    case 'warnings':
    case 'pause':
      return resolveChoices(form[fieldId])
    default:
      return []
  }
}

const CompassDocument = forwardRef<HTMLDivElement, Props>(({ form }, ref) => {
  const name = form.name.trim()

  return (
    <div
      ref={ref}
      dir="rtl"
      style={{ width: DOC_WIDTH_PX, minHeight: DOC_MIN_HEIGHT_PX }}
      className="flex flex-col bg-white"
    >
      <div className="flex flex-1 flex-col px-14 pb-10 pt-12">
        {/* כותרת ראשית */}
        <header>
          <p className="text-right text-sm font-semibold tracking-wide text-sky">
            מנהיגות בתנועה · מאיצים קדימה — מפגש 2
          </p>
          <h1 className="mt-2 text-right text-[40px] font-bold leading-tight text-navy-deep">
            המצפן האישי שלי
          </h1>
          {name && (
            <p className="mt-1 text-right text-2xl font-semibold text-ink/80">{name}</p>
          )}
          <span className="mt-3 block h-1.5 w-20 rounded-full bg-magenta" />
        </header>

        {/* ששת הבלוקים */}
        <div className="mt-9 flex-1 space-y-6">
          {fields.map((field, i) => {
            const index = i + 1
            const isCommitment = field.id === 'commitment'
            if (isCommitment) return null // מוצג נפרד ומודגש בתחתית

            const isChoice = field.kind === 'choice'
            const choices = isChoice ? blockValue(form, field.id) : []
            const text = !isChoice ? form[field.id as 'price' | 'pauseQuestion'].trim() : ''
            const empty = isChoice ? choices.length === 0 : text.length === 0

            return (
              <section key={field.id} className="border-b border-navy-deep/10 pb-5">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-magenta">{index}</span>
                  <h2 className="text-right text-xl font-bold text-navy-deep">{field.title}</h2>
                </div>
                <p className="mt-0.5 mr-5 text-right text-[13px] text-ink/55">
                  {(field as ChoiceField).question}
                </p>

                <div className="mt-3 mr-5">
                  {empty ? (
                    <span className="text-right text-base italic text-ink/30">—</span>
                  ) : isChoice ? (
                    <div className="flex flex-wrap gap-2">
                      {choices.map((c) => (
                        <span
                          key={c}
                          className="rounded-full bg-sky/10 px-4 py-1.5 text-base font-semibold text-navy"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-right text-lg leading-relaxed text-ink">{text}</p>
                  )}
                </div>
              </section>
            )
          })}
        </div>

        {/* המחויבות השבועית — מודגשת ויזואלית, ה"לקיחה" המרכזית */}
        <section className="mt-6 rounded-2xl bg-navy-deep px-8 py-7 text-white">
          <p className="text-right text-sm font-semibold tracking-wide text-sky">
            המחויבות השבועית
          </p>
          <p className="mt-2 text-right text-lg font-semibold leading-relaxed text-white/85">
            בשבוע הקרוב אני בוחר.ת לשים לב במיוחד ל:
          </p>
          <p className="mt-3 text-right text-2xl font-bold leading-snug text-white">
            {form.commitment.trim() || '—'}
          </p>
        </section>
      </div>

      {/* כותרת תחתונה — לוגואים */}
      <footer className="flex items-center justify-between border-t border-navy-deep/10 px-14 py-6">
        <NggLogo />
        <DelekMotorsLogo />
      </footer>
    </div>
  )
})

CompassDocument.displayName = 'CompassDocument'

export default CompassDocument
