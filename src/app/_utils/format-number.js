import numeral from 'numeral'

// ----------------------------------------------------------------------

function result(format, key = '.00') {
  const isInteger = format.includes(key)

  return isInteger ? format.replace(key, '') : format
}

export function fNumber(number) {
  return numeral(number).format()
}

export function fCurrency(number) {
  const format = number ? numeral(number).format('0,0.00') : ''
  const res = result(format, '.00')

  return res ? `$ ${res}` : ''
}

export function fPercent(number) {
  const format = number ? numeral(Number(number) / 100).format('0.0%') : ''

  return result(format, '.0')
}

export function fShortenNumber(number) {
  const format = number ? numeral(number).format('0.00a') : ''

  return result(format, '.00')
}

export function fData(number) {
  const format = number ? numeral(number).format('0.0 b') : ''

  return result(format, '.0')
}

export function fCont(number) {
  const format = number ? numeral(number).format('0,0.00') : '0'

  return result(format, '.00')
}
