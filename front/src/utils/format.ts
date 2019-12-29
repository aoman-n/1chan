export const formatDate = (strDate: string) => {
  let date = ''

  // convert: string -> date
  try {
    if (typeof strDate === 'string') {
      date = new Date(strDate).toISOString()
    }
  } catch (e) {
    console.log(e)
  }

  // format: yyy/mm/dd hh:mm
  if (date) {
    const splitDate = date.split('T')
    const d = splitDate[0].replace(/-/g, '/')
    const time = splitDate[1].split(':')
    const t = time[0] + ':' + time[1]
    date = `${d} ${t}`
  }

  return date
}
