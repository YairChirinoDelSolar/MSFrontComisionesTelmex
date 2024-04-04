import dayjs from 'dayjs'

export const getTodayDate = () => dayjs()

export const getTimeFromToday = (date, unit = 'days') =>
  dayjs().diff(dayjs(date), unit)
