import { useEffect, useRef, useState } from 'react'
import type { FormState } from '../types'
import { exportPdf, exportPng } from '../utils/export'
import CompassDocument, { DOC_WIDTH_PX } from './CompassDocument'
import { SectionHeading } from './Decor'

interface Props {
  form: FormState
  onBack: () => void
  onRestart: () => void
}

type Busy = null | 'pdf' | 'png'

export default function Summary({ form, onBack, onRestart }: Props) {
  // מסמך מלא מחוץ למסך — נלכד בפועל ל-PDF/PNG ברזולוציה מלאה
  const captureRef = useRef<HTMLDivElement>(null)
  // מעטפת התצוגה המוקטנת
  const previewWrapRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [docHeight, setDocHeight] = useState(DOC_WIDTH_PX * 1.414)
  const [busy, setBusy] = useState<Busy>(null)
  const [error, setError] = useState<string | null>(null)

  // התאמת קנה המידה של התצוגה לרוחב המכשיר + מדידת גובה המסמך בפועל
  useEffect(() => {
    const update = () => {
      const wrap = previewWrapRef.current
      const doc = captureRef.current
      if (!wrap || !doc) return
      const available = wrap.clientWidth
      const nextScale = Math.min(1, available / DOC_WIDTH_PX)
      setScale(nextScale)
      setDocHeight(doc.offsetHeight)
    }
    update()
    const ro = new ResizeObserver(update)
    if (previewWrapRef.current) ro.observe(previewWrapRef.current)
    if (captureRef.current) ro.observe(captureRef.current)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [form])

  const handleExport = async (kind: 'pdf' | 'png') => {
    if (!captureRef.current || busy) return
    setBusy(kind)
    setError(null)
    try {
      if (kind === 'pdf') await exportPdf(captureRef.current, form.name)
      else await exportPng(captureRef.current, form.name)
    } catch (e) {
      console.error(e)
      setError('משהו השתבש בהורדה. אפשר לנסות שוב.')
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className="min-h-full bg-surface">
      <header className="border-b border-navy-deep/10 bg-surface px-6 pb-4 pt-5">
        <button
          type="button"
          onClick={onBack}
          className="mb-3 text-sm font-semibold text-sky hover:underline"
        >
          ← חזרה לעריכה
        </button>
        <SectionHeading className="!text-xl">המצפן שלך מוכן</SectionHeading>
        <p className="mt-3 text-right text-sm leading-relaxed text-ink/70">
          זה הסיכום האישי שלך. אפשר להוריד אותו לשמירה ולהמשך עבודה.
        </p>
      </header>

      <main className="mx-auto w-full max-w-2xl px-6 py-6">
        {/* תצוגה מוקטנת של המסמך */}
        <div ref={previewWrapRef} className="w-full">
          <div
            className="mx-auto overflow-hidden rounded-2xl shadow-card ring-1 ring-navy-deep/10"
            style={{ width: DOC_WIDTH_PX * scale, height: docHeight * scale }}
          >
            <div
              style={{
                width: DOC_WIDTH_PX,
                transform: `scale(${scale})`,
                transformOrigin: 'top right',
              }}
            >
              <CompassDocument form={form} />
            </div>
          </div>
        </div>

        {/* כפתורי הורדה */}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            className="pill-primary w-full sm:w-auto"
            onClick={() => handleExport('pdf')}
            disabled={busy !== null}
          >
            {busy === 'pdf' ? 'מכין PDF…' : 'הורד PDF'}
          </button>
          <button
            type="button"
            onClick={() => handleExport('png')}
            disabled={busy !== null}
            className="inline-flex w-full items-center justify-center rounded-full border-2 border-sky
                       bg-white px-8 py-3.5 text-base font-bold text-sky transition
                       hover:bg-sky/5 active:scale-[0.98]
                       focus:outline-none focus-visible:ring-4 focus-visible:ring-sky/30
                       disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {busy === 'png' ? 'מכין תמונה…' : 'הורד תמונה'}
          </button>
        </div>

        {error && (
          <p className="mt-4 text-center text-sm font-semibold text-magenta" role="alert">
            {error}
          </p>
        )}

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={onRestart}
            className="text-sm font-semibold text-ink/50 hover:text-ink hover:underline"
          >
            התחל מצפן חדש
          </button>
        </div>
      </main>

      {/* מסמך מלא מחוץ למסך — מקור הלכידה ל-PDF/PNG */}
      <div
        aria-hidden="true"
        style={{ position: 'fixed', top: 0, right: -100000, pointerEvents: 'none' }}
      >
        <CompassDocument ref={captureRef} form={form} />
      </div>
    </div>
  )
}
