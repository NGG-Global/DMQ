// סמלי מותג — wordmarks וקטוריים נקיים בפלטת המותג.
// הערה: אלו סמלים זמניים (placeholders). יש להחליפם בקבצי הלוגו הרשמיים
// של NGG ושל דלק מוטורס כשיתקבלו מתיקיית הנכסים.

export function NggLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center leading-none ${className}`} aria-label="NGG">
      <span className="text-[19px] font-bold tracking-[0.18em] text-navy-deep">NGG</span>
      <span className="mt-0.5 text-[8px] font-semibold tracking-[0.12em] text-ink/60">
        CONSULTING
      </span>
    </div>
  )
}

export function DelekMotorsLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col items-end leading-none ${className}`} aria-label="דלק מוטורס">
      <span className="text-[18px] font-bold tracking-tight text-navy-deep">דלק מוטורס</span>
      <span className="mt-0.5 text-[8px] font-semibold tracking-[0.06em] text-sky">
        DELEK MOTORS
      </span>
    </div>
  )
}
