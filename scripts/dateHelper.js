export const convertDateToDateId = (dateObject) => {
  const year = dateObject.getFullYear()
  const month = dateObject.getMonth() + 1
  const date = dateObject.getDate()
  return `${year}${`0${month}`.slice(-2)}${`0${date}`.slice(-2)}`
}

export const convertDateIdToDate = (dateId) => {
  const year = Number(dateId.slice(0, 4))
  const month = Number(dateId.slice(4, 6))
  const date = Number(dateId.slice(6, 8))

  return new Date(year, month - 1, date)
}

export const getDayText = (dateObject) => {
  const dayText = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  return dayText[dateObject.getDay()]
}

export const convertFirebaseDateToDateObject = (firebaseDate) => {
  return new Date(firebaseDate.seconds * 1000)
}
