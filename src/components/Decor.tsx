// אלמנטים דקורטיביים מהשפה הויזואלית של המצגת.

/** משולשים קטנים פונים מטה — מוטיב עדין בגוון אפור בהיר */
export function TriangleStrip({ className = '' }: { className?: string }) {
  return (
    <div className={`flex gap-1.5 ${className}`} aria-hidden="true">
      {Array.from({ length: 7 }).map((_, i) => (
        <span
          key={i}
          className="inline-block h-0 w-0 border-x-[5px] border-t-[8px] border-x-transparent border-t-black/[0.06]"
        />
      ))}
    </div>
  )
}

/** כותרת תוכן מיושרת לימין עם קו הדגשה מג'נטה מתחתיה */
export function SectionHeading({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h1 className={`magenta-underline text-right text-2xl font-bold text-navy-deep ${className}`}>
      {children}
    </h1>
  )
}
