import { useState } from 'react'
import EntryScreen from './components/EntryScreen'
import Questionnaire from './components/Questionnaire'
import Summary from './components/Summary'
import { initialFormState } from './types'
import type { FormState, Screen } from './types'

export default function App() {
  // כל המצב בזיכרון הסשן בלבד — ללא שרת, ללא DB, ללא איסוף נתונים.
  const [screen, setScreen] = useState<Screen>('entry')
  const [form, setForm] = useState<FormState>(initialFormState)

  const goTo = (next: Screen) => {
    setScreen(next)
    window.scrollTo({ top: 0 })
  }

  const handleStart = (name: string) => {
    setForm((prev) => ({ ...prev, name }))
    goTo('questionnaire')
  }

  const handleRestart = () => {
    setForm(initialFormState())
    goTo('entry')
  }

  return (
    <div className="min-h-full">
      {screen === 'entry' && <EntryScreen initialName={form.name} onStart={handleStart} />}

      {screen === 'questionnaire' && (
        <Questionnaire
          form={form}
          setForm={setForm}
          onSubmit={() => goTo('summary')}
          onBack={() => goTo('entry')}
        />
      )}

      {screen === 'summary' && (
        <Summary
          form={form}
          onBack={() => goTo('questionnaire')}
          onRestart={handleRestart}
        />
      )}
    </div>
  )
}
