import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

// ייצוא בצד הלקוח בלבד.
//
// אסטרטגיית RTL: במקום לצייר טקסט עברי דרך jsPDF (שם תווים נוטים להתהפך
// וניקוד נשבר), אנו מרנדרים את מסמך הסיכום כ-DOM עברי תקין, מצלמים אותו
// ל-canvas באמצעות html2canvas — שמשמר במדויק את רינדור הדפדפן עצמו —
// ואז שומרים את התמונה כ-PNG או מטמיעים אותה בעמוד A4 של jsPDF.
// כך ה-RTL והעברית נשמרים במלואם, ללא היפוך תווים.

const A4_WIDTH_MM = 210
const A4_HEIGHT_MM = 297
const CAPTURE_SCALE = 2.5 // איכות גבוהה להדפסה ולמסכי רטינה

/** מוודא שפונט Heebo נטען במלואו לפני הצילום — קריטי לרינדור עקבי */
async function ensureFontsReady(): Promise<void> {
  if (!('fonts' in document)) return
  try {
    // טעינה מפורשת של המשקלים שבשימוש
    await Promise.all([
      document.fonts.load('400 16px Heebo'),
      document.fonts.load('600 16px Heebo'),
      document.fonts.load('700 16px Heebo'),
    ])
    await document.fonts.ready
  } catch {
    // אם הטעינה נכשלה — נמשיך עם fallback, לא נחסום את ההורדה
  }
}

async function renderToCanvas(node: HTMLElement): Promise<HTMLCanvasElement> {
  await ensureFontsReady()
  return html2canvas(node, {
    scale: CAPTURE_SCALE,
    backgroundColor: '#ffffff',
    useCORS: true,
    logging: false,
    windowWidth: node.scrollWidth,
    windowHeight: node.scrollHeight,
  })
}

function buildFileName(name: string, ext: 'pdf' | 'png'): string {
  const clean = name.trim().replace(/\s+/g, '-')
  const suffix = clean ? `-${clean}` : ''
  return `המצפן-האישי${suffix}.${ext}`
}

function triggerDownload(href: string, fileName: string): void {
  const link = document.createElement('a')
  link.href = href
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export async function exportPng(node: HTMLElement, name: string): Promise<void> {
  const canvas = await renderToCanvas(node)
  triggerDownload(canvas.toDataURL('image/png'), buildFileName(name, 'png'))
}

export async function exportPdf(node: HTMLElement, name: string): Promise<void> {
  const canvas = await renderToCanvas(node)
  const imgData = canvas.toDataURL('image/png')

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

  // התאמת התמונה לרוחב A4 תוך שמירת יחס; אם גבוהה מדי — מתחלקת לעמודים.
  const imgWidth = A4_WIDTH_MM
  const imgHeight = (canvas.height * imgWidth) / canvas.width

  let heightLeft = imgHeight
  let position = 0

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
  heightLeft -= A4_HEIGHT_MM

  while (heightLeft > 0) {
    position -= A4_HEIGHT_MM
    pdf.addPage()
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= A4_HEIGHT_MM
  }

  pdf.save(buildFileName(name, 'pdf'))
}
