import type { ChoiceFieldId, TextFieldId } from './data/questions'

/** מצב התשובות — נשמר בזיכרון הסשן בלבד (ללא שרת, ללא DB) */
export interface ChoiceAnswer {
  /** אפשרויות מובנות שנבחרו */
  selected: string[]
  /** ערך "אחר" (עד 50 תווים); ריק = לא נבחר */
  other: string
}

export interface FormState {
  name: string
  triggers: ChoiceAnswer
  warnings: ChoiceAnswer
  price: string
  pause: ChoiceAnswer
  pauseQuestion: string
  commitment: string
}

export type Screen = 'entry' | 'questionnaire' | 'summary'

export const emptyChoice = (): ChoiceAnswer => ({ selected: [], other: '' })

export const initialFormState = (): FormState => ({
  name: '',
  triggers: emptyChoice(),
  warnings: emptyChoice(),
  price: '',
  pause: emptyChoice(),
  pauseQuestion: '',
  commitment: '',
})

/** מאחד אפשרויות שנבחרו + "אחר" לרשימה אחת להצגה בסיכום */
export const resolveChoices = (answer: ChoiceAnswer): string[] => {
  const values = [...answer.selected]
  const other = answer.other.trim()
  if (other) values.push(other)
  return values
}

export type { ChoiceFieldId, TextFieldId }
