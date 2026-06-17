import { fields } from '../data/questions'
import type { FormState } from '../types'
import { SectionHeading, TriangleStrip } from './Decor'
import { ChoiceFieldInput, TextFieldInput } from './QuestionFields'

interface Props {
  form: FormState
  setForm: (next: FormState) => void
  onSubmit: () => void
  onBack: () => void
}

export default function Questionnaire({ form, setForm, onSubmit, onBack }: Props) {
  return (
    <div className="min-h-full bg-surface">
      <header className="sticky top-0 z-10 border-b border-navy-deep/10 bg-surface/90 px-6 pb-4 pt-5 backdrop-blur">
        <button
          type="button"
          onClick={onBack}
          className="mb-3 text-sm font-semibold text-sky hover:underline"
        >
          ← חזרה
        </button>
        <SectionHeading className="!text-xl">המצפן האישי</SectionHeading>
      </header>

      <main className="mx-auto w-full max-w-md px-6 py-6">
        <p className="mb-5 text-right text-sm leading-relaxed text-ink/70">
          שש שאלות קצרות. אין תשובות נכונות — רק שלך. אפשר לדלג על מה שלא מתאים.
        </p>

        <div className="space-y-4">
          {fields.map((field, i) => {
            const index = i + 1
            if (field.kind === 'choice') {
              return (
                <ChoiceFieldInput
                  key={field.id}
                  index={index}
                  field={field}
                  value={form[field.id]}
                  onChange={(next) => setForm({ ...form, [field.id]: next })}
                />
              )
            }
            return (
              <TextFieldInput
                key={field.id}
                index={index}
                field={field}
                value={form[field.id]}
                onChange={(next) => setForm({ ...form, [field.id]: next })}
              />
            )
          })}
        </div>

        <button type="button" className="pill-primary mt-8 w-full" onClick={onSubmit}>
          צור את המצפן שלי
        </button>

        <TriangleStrip className="mt-8 justify-center" />
      </main>
    </div>
  )
}
