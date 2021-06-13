import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import 'jest-styled-components'
import App from '../src/App'

const card = {
  cardNumber: '1111111111111111',
  cardName: 'Tester',
  cardExpirationMonth: '11',
  cardExpirationYear: new Date().getFullYear() + 1,
  cardCVV: '111',
}

const cardTypes = {
  Visa: '4111111111111111',
  Maestro: '6111111111111111',
  MasterCard: '5111111111111111',
  'American Express': '341111111111111',
  'Diners Club International': '36111111111111',
  Discover: '1101111111111111',
  JCB: '3528111111111111'
}

test('Card form submit', () => {
  render(<App/>)

  const number = screen.getByLabelText('Card Number')
  fireEvent.change(number, { target: { value: card.cardNumber } })

  const name = screen.getByLabelText('Card Name')
  fireEvent.change(name, { target: { value: card.cardName } })
  
  const month = screen.getByDisplayValue('Month')
  fireEvent.change(month, { target: { value: card.cardExpirationMonth } })
  
  const year = screen.getByDisplayValue('Year')
  fireEvent.change(year, { target: { value: card.cardExpirationYear } })
  
  const cvv = screen.getByLabelText('CVV')
  fireEvent.change(cvv, { target: { value: card.cardCVV } })
  
  fireEvent.click(screen.getByText('Pay'))

  // Check submission success.
})

test('Card number format', () => {
  render(<App/>)
  
  const number = screen.getByLabelText('Card Number')
  fireEvent.change(number, { target: { value: card.cardNumber } })
  expect(number.value).toBe('1111 1111 1111 1111')
  
})

test('Card number error', () => {
  render(<App/>)

  const number = screen.getByLabelText('Card Number')
  fireEvent.change(number, { target: { value: '1111' } })
  fireEvent.blur(number)
  expect(number).toHaveStyleRule('outline', '1px solid red')

  expect(screen.getByText('Pay')).toBeDisabled

})

test('Card expiration error', () => {
  render(<App/>)

  const month = screen.getByDisplayValue('Month')
  fireEvent.change(month, { target: { value: '0' } })
  fireEvent.blur(month)

  const year = screen.getByDisplayValue('Year')
  fireEvent.change(year, { target: { value: String(new Date().getFullYear()) } })
  fireEvent.blur(year)

  expect(screen.getByText('Pay')).toBeDisabled

})

test('Card types', () => {
  render(<App/>)

  const number = screen.getByLabelText('Card Number')
  Object.keys(cardTypes).forEach(alt => {
    fireEvent.change(number, { target: { value: cardTypes[alt] } })
    expect(screen.getByAltText(alt)).toBeInTheDocument
  })

})