import { useState } from 'react'

interface Props {
  initialName: string
  onStart: (name: string) => void
}

export default function EntryScreen({ initialName, onStart }: Props) {
  const [name, setName] = useState(initialName)

  return (
    <div className="relative flex min-h-full flex-col overflow-hidden bg-navy-deep text-white">
      {/* רקע: תחושת תנועה טכנולוגית — זוהר עדין וחצים שמאלה (קדימה ב-RTL) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(120% 90% at 85% 0%, #003571 0%, #002060 45%, #001D4A 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 top-1/3 h-72 w-72 rounded-full bg-sky/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 bottom-10 h-56 w-56 rounded-full bg-magenta/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col px-6 pb-10 pt-14 sm:pt-20">
        {/* תווית "מפגש 2" כגלולה — כמו בשקף הפתיחה */}
        <span className="mb-8 inline-flex w-fit items-center rounded-full bg-sky px-4 py-1.5 text-sm font-bold text-white shadow-pill">
          מפגש 2 · הטייס האוטומטי
        </span>

        <div className="flex flex-1 flex-col justify-center">
          <h1 className="text-right text-4xl font-bold leading-tight">המצפן האישי</h1>
          <span className="mt-3 block h-1 w-14 rounded-full bg-magenta" aria-hidden="true" />

          <p className="mt-6 text-right text-lg leading-relaxed text-white/80">
            רגע אישי לסיכום: נמפה יחד את הטריגרים, סימני האזהרה והאסטרטגיות שיעזרו לך
            לעצור רגע — לפני שהטייס האוטומטי תופס פיקוד.
          </p>

          <div className="mt-10">
            <label htmlFor="name" className="mb-2 block text-right text-sm font-semibold text-white/90">
              השם שלך <span className="font-normal text-white/50">(אופציונלי)</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="איך לקרוא לך?"
              autoComplete="name"
              dir="rtl"
              className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3.5 text-right
                         text-base text-white placeholder:text-white/40 backdrop-blur
                         focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/50"
            />
          </div>
        </div>

        <button type="button" className="pill-primary mt-10 w-full" onClick={() => onStart(name)}>
          בוא נתחיל
        </button>
      </div>
    </div>
  )
}
