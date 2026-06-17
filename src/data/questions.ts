// מבנה השאלון — הניסוחים מועתקים מילה במילה ממסמך האפיון ואין לשנותם.

export const OTHER_MAX = 50
export const FREE_TEXT_MAX_120 = 120
export const FREE_TEXT_MAX_150 = 150

export type ChoiceFieldId = 'triggers' | 'warnings' | 'pause'
export type TextFieldId = 'price' | 'pauseQuestion' | 'commitment'

export interface ChoiceField {
  id: ChoiceFieldId
  kind: 'choice'
  title: string
  question: string
  options: string[]
  hasOther: true
}

export interface TextField {
  id: TextFieldId
  kind: 'text'
  title: string
  question: string
  maxLength: number
  /** דוגמאות עזר להצגה מתחת לשדה (לא לבחירה) */
  hints?: string[]
  /** השאלה משמשת כטקסט מוביל ולא כשאלה רגילה */
  isLeading?: boolean
}

export type Field = ChoiceField | TextField

export const fields: Field[] = [
  {
    id: 'triggers',
    kind: 'choice',
    title: 'הטריגרים שלי',
    question: 'באילו מצבים הטייס האוטומטי שלי נוטה להשתלט?',
    options: ['לחץ זמן', 'התנגדות של עובד', 'ביקורת', 'חוסר וודאות', 'עומס'],
    hasOther: true,
  },
  {
    id: 'warnings',
    kind: 'choice',
    title: 'סימני האזהרה שלי',
    question: 'איך אני אדע שהטייס האוטומטי כבר תפס פיקוד?',
    options: ['קפיצה למסקנות', 'אובדן קשב', 'מעבר לדיבור מהיר', 'ציוניות/ ביקורתיות'],
    hasOther: true,
  },
  {
    id: 'price',
    kind: 'text',
    title: 'המחיר',
    question: 'מה המחיר שאשלם כמנהל.ת כשאפעל על אוטומט?',
    maxLength: FREE_TEXT_MAX_120,
  },
  {
    id: 'pause',
    kind: 'choice',
    title: 'עצירה בזמן',
    question: 'מה יעזור לי לעצור רגע לפני התגובה?',
    options: ['נשימה עמוקה', 'לבקש עוד מידע', 'לספור עד 10', 'לדחות את התגובה ב-5 דקות'],
    hasOther: true,
  },
  {
    id: 'pauseQuestion',
    kind: 'text',
    title: 'שאלת העצירה שלי',
    question: 'השאלה שאשאל את עצמי לפני התגובה:',
    maxLength: FREE_TEXT_MAX_150,
    hints: [
      'מה אני יודע.ת בוודאות?',
      'איזו פרשנות נוספת יכולה להיות?',
      'מה אני לא רואה כרגע?',
      'מה ישרת את המטרה ולא את האגו?',
    ],
  },
  {
    id: 'commitment',
    kind: 'text',
    title: 'המחויבות השבועית',
    question: 'בשבוע הקרוב אני בוחר.ת לשים לב במיוחד ל:',
    maxLength: FREE_TEXT_MAX_150,
    isLeading: true,
  },
]
