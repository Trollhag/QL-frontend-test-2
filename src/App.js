import { useState, useMemo } from 'react'
import { Transition, SwitchTransition } from 'react-transition-group'
import styled, { createGlobalStyle, keyframes } from 'styled-components/macro'
import { Container, Grid, Column } from './styled/Grid'
import { Label, Input, Select, inputValidation } from './styled/Input'
import Button from './styled/Buttons';
import { Card } from './styled/Card'
import { pad, cardTypes, validateCardExpirationDate } from './utils'

const Styles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html {
    font-size: 18px;
    font-family: 'Roboto', --apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
  body {
    position: relative;
    margin: 0;
    background-color: peachpuff;
    height: 100%;
    min-height: 100vh;
  }
  #root {
    display: flex;
    align-items: center;
    height: 100%;
    min-height: 100vh;
  }
  img {
    max-width: 100%;
  }
`

const slideUpIn = keyframes`
  0% {
    transform: translateY(.5em);
    opacity: 0;
  }
  100% {
    transform: translateY(0em);
    opacity: 1;
  }
`

function AnimateText({ children }) {
  return children.map((char, i) => ' ' === char ? ' ' : (
    <SwitchTransition key={i} mode="out-in">
      <Transition key={i} timeout={150}>
        <AnimateText.Char>{char}</AnimateText.Char>
      </Transition>
    </SwitchTransition>
  ))
}
AnimateText.Char = styled.span`
  animation: ${slideUpIn} 150ms ease;
  display: inline-block;
`

function App() {
  const [flipCard, setFlipCard] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardExpiration, setCardExpiration] = useState(['', ''])
  const [cardCVV, setCardCVV] = useState('')

  const [formErrors, setFormErrors] = useState({})

  const { cardType, previewNumber } = useMemo(() => {
    const type = cardTypes.find(type => type.checkBIN(cardNumber))
    // Format card number and add a hash for every missing character.
    const number = type.format(cardNumber + (type.maxLength - cardNumber.length ? Array(type.maxLength - cardNumber.length).fill('#').join('') : '')).split(' ')
    // Replace all numbers with stars in all card number parts except the first and last.
    for (let i = 1; i < number.length - 1; i++) {
      number[i] = number[i].replace(/\d/g, '*')
    }
    return {
      cardType: type,
      previewNumber: number.map((part, i) => (
        <Card.Number.Part key={i}><AnimateText>{part.split('')}</AnimateText></Card.Number.Part>
      )),
    }
  }, [cardNumber])

  return (
    <Container>
      <Styles />
      <div>
        <Card.Wrapper flip={flipCard}>
          <Card.Frontside>
            <Card src="card-background.jpg"/>
            <SwitchTransition mode="out-in">
              <Transition
                key={cardType.key}
                timeout={150}
                children={state => (
                  <Card.LogoWrapper className={state}>{cardType.logo}</Card.LogoWrapper>
                )}
              />
            </SwitchTransition>
            <Card.Number>{previewNumber}</Card.Number>
            <Card.Holder>
              <Card.Label>Card Holder</Card.Label>
              <AnimateText>{(cardName || 'John Smith').split('')}</AnimateText>
            </Card.Holder>
            <Card.Expiration>
              <Card.Label>Expires</Card.Label>
              <AnimateText>{(!cardExpiration[0] ? 'MM' : pad(cardExpiration[0] + 1)).split('')}</AnimateText>
              /
              <AnimateText>{(!cardExpiration[1] ? 'YY' : String(cardExpiration[1]).slice(-2)).split('')}</AnimateText>
            </Card.Expiration>
          </Card.Frontside>
          <Card.Backside>
            <Card src="card-background.jpg"/>
            <Card.CVV> <AnimateText>{Array(cardCVV.length).fill('*')}</AnimateText></Card.CVV>
            <Card.Backside.LogoWrapper>
              {cardType.logo}
            </Card.Backside.LogoWrapper>
          </Card.Backside>
        </Card.Wrapper>
      </div>
      <Grid
        as="form"
        onSubmit={event => {
          event.preventDefault();
          const errors = {
            cardNumber: !cardType.validateNumbers(cardNumber),
            cardName: cardName === "",
            cardExpiration: !validateCardExpirationDate(cardExpiration),
            cardCVV: !cardType.validateCVV(cardCVV)
          }
          setFormErrors(errors)
          if (Object.values(errors).indexOf(true) === -1) {
            // Submit to server.
          }
        }}
      >
        <Column>
          <Label>
            Card Number
            <Input
              type="text"
              maxLength={cardType.maxLength + cardType.maxColumns}
              onChange={e => {
                const value = e.target.value.replace(/\D/g, '')
                setCardNumber(value)
                if (formErrors.cardNumber && cardType.validateNumbers(value)) {
                  setFormErrors({ ...formErrors, cardNumber: false })
                } 
              }}
              onBlur={() => {
                setFormErrors({ ...formErrors, cardNumber: !cardType.validateNumbers(cardNumber) })
              }}
              value={cardType.format(cardNumber).trim()}
              error={formErrors.cardNumber}
            />
          </Label>
        </Column>
        <Column>
          <Label>
            Card Name
            <Input
              type="text"
              maxLength={34}
              onChange={e => {
                setCardName(e.target.value)
                if (formErrors.cardName && e.target.value !== "") {
                  setFormErrors({ ...formErrors, cardName: false })
                }
              }}
              onBlur={() => setFormErrors({ ...formErrors, cardName: cardName === "" })}
              value={cardName}
              error={formErrors.cardName}
            />
          </Label>
        </Column>
        <Column width={100/3*2}>
          <Grid css={formErrors.cardExpiration ? inputValidation.error : inputValidation.base}>
            <Column width={50}>
              <Label>
                Exipration
                <Select
                  onChange={e => {
                    setCardExpiration([parseInt(e.target.value), cardExpiration[1]])
                    if (formErrors.cardExpiration && validateCardExpirationDate(cardExpiration)) {
                      setFormErrors({ ...formErrors, cardExpiration: false })
                    }
                  }}
                  onBlur={() => setFormErrors({ ...formErrors, cardExpiration: !validateCardExpirationDate(cardExpiration) })}
                  value={cardExpiration[0]}
                >
                  {'' === cardExpiration[0] && <option>Month</option>}
                  {Array(12).fill(null).map((_,i) => <option key={i} value={i}>{pad(i + 1)}</option>)}
                </Select>
              </Label>
            </Column>
            <Column width={50}>
              <Label>
                <br/>
                <Select
                  onChange={e => setCardExpiration([cardExpiration[0], parseInt(e.target.value)])}
                  onBlur={() => setFormErrors({ ...formErrors, cardExpiration: !validateCardExpirationDate(cardExpiration) })}
                  value={cardExpiration[1]}
                >
                  {'' === cardExpiration[1] && <option>Year</option>}
                  {Array(10).fill(null).map((_,i) => <option key={i} value={new Date().getFullYear() + i}>{new Date().getFullYear() + i}</option>)}
                </Select>
              </Label>
            </Column>
          </Grid>
        </Column>
        <Column width={100/3}>
          <Label>
            CVV
            <Input
              type="text"
              maxLength="4"
              onChange={e => {
                const value = e.target.value.replace(/\D/g, '');
                setCardCVV(value)
                if (formErrors.cardCVV && cardType.validateCVV(value)) {
                  setFormErrors({ ...formErrors, cardCVV: false })
                }
              }}
              onFocus={() => setFlipCard(true)}
              onBlur={() => {
                setFlipCard(false)
                setFormErrors({ ...formErrors, cardCVV: !cardType.validateCVV(cardCVV) })
              }}
              value={cardCVV}
              error={formErrors.cardCVV}
            />
          </Label>
        </Column>
        <Column>
          <Button type="submit" disabled={Object.values(formErrors).indexOf(true) >= 0}>Pay</Button>
        </Column>
      </Grid>
    </Container>
  );
}

export default App;
