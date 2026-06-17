// סמל NGG — שחזור וקטורי (SVG) של הלוגו: משולש בגרדיאנט כסוף, "סוויש" מג'נטה
// חוצה אותו, ומילולון "NGG" מתחת.
//
// המשולש והסוויש מצוירים כ-SVG; המילולון "NGG" מרונדר כטקסט HTML רגיל —
// כך הוא נלכד באמינות ב-html2canvas בייצוא ל-PDF/PNG (רינדור טקסט בתוך SVG
// אינו נתמך באופן עקבי).
//
// הערה: זהו שחזור וקטורי נאמן למקור. אם נדרשת התאמה מדויקת לפיקסל, יש להחליף
// בקובץ הלוגו הרשמי (PNG/SVG בתיקיית הנכסים).

type Tone = 'dark' | 'light'

interface Props {
  /** צבע מילולון ה-NGG: 'dark' לרקע בהיר (נייבי), 'light' לרקע כהה (לבן) */
  tone?: Tone
  className?: string
  /** רוחב הסמל בפיקסלים */
  width?: number
}

export function NggLogo({ tone = 'dark', className = '', width = 92 }: Props) {
  const wordColor = tone === 'light' ? '#FFFFFF' : '#001D4A'

  return (
    <div
      className={`flex flex-col items-center leading-none ${className}`}
      style={{ width }}
      aria-label="NGG"
    >
      <svg
        viewBox="0 0 456 350"
        width={width}
        height={width * (350 / 456)}
        role="img"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* גרדיאנט כסוף למשולש */}
          <linearGradient id="ngg-silver" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f4f4f4" />
            <stop offset="42%" stopColor="#d2d2d2" />
            <stop offset="58%" stopColor="#bcbcbc" />
            <stop offset="100%" stopColor="#8a8a8a" />
          </linearGradient>
        </defs>

        {/* משולש כטבעת (outer + inner עם evenodd) */}
        <path
          fillRule="evenodd"
          fill="url(#ngg-silver)"
          d="M228 28 L428 330 L28 330 Z M228 108 L348 290 L108 290 Z"
        />

        {/* סוויש מג'נטה */}
        <path
          fill="#E2088C"
          d="M86 240
             C 96 196 150 182 200 196
             C 290 214 360 150 416 90
             C 388 170 300 214 206 224
             C 150 232 104 250 86 240 Z"
        />
      </svg>

      {/* מילולון NGG כטקסט HTML — נלכד באמינות בייצוא */}
      <span
        className="font-bold leading-none"
        style={{
          color: wordColor,
          fontSize: width * 0.34,
          letterSpacing: width * 0.04,
          marginTop: width * 0.02,
        }}
      >
        NGG
      </span>
    </div>
  )
}
