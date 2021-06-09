import styled from 'styled-components/macro'

export const Card = styled.img`
  border-radius: 8px;
  vertical-align: top;
`
Card.Frontside = styled.div`
  position: relative;
  backface-visibility: hidden;
`;
Card.Backside = styled(Card.Frontside)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotateY(180deg);
  ${Card} {
    transform: rotateY(180deg);
  }
  &:before {
    content: "";
    position: absolute;
    top: 15%;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 20%;
    background-color: rgba(0,0,0,.7);
  }
`
Card.Wrapper = styled.div`
  position: relative;
  width: 400px;
  max-width: 80%;
  margin: -30% auto 30px;
  font-family: 'Roboto Mono', monospace;
  font-weight: bold;
  letter-spacing: .1em;
  color: #fff;
  transform-origin: center right;
  transform: ${({ flip }) => `rotateY(${flip ? 180 : 0}deg) translateX(${flip ? 100 : 0}%)`};
  transition: transform .6s ease;
  perspective: 600px;
  transform-style: preserve-3d;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`
Card.Label = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transform: translateY(-100%);
  font-weight: 400;
  font-size: 12px;
  text-transform: none;
  letter-spacing: normal;
  opacity: .7;
`
Card.LogoWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0;
  transform: translateY(15px);
  transition: opacity 100ms, transform 150ms;
  &.entered {
    opacity: 1;
    transform: translateY(0px);
  }
  &.exiting {
    opacity: 0;
    transform: translateY(-15px);
  }
`
Card.Number = styled.p`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  font-size: 22px;
  margin: 0;
  padding: 0 20px;
`;
Card.Number.Part = styled.span`
  display: inline-block;
  margin-right: 20px;
`
Card.Holder = styled.p`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  text-transform: uppercase;
  font-size: 16px;
  margin: 0;
  min-height: 1.3em;
`
Card.Expiration = styled.p`
  text-align: right;
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 100px;
  font-size: 16px;
  margin: 0;
  min-height: 1.3em;
`
Card.Backside.LogoWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  z-index: 1;
`
Card.CVV = styled.pre`
  position: absolute;
  top: 50%;
  left: 20px;
  right: 20px;
  padding: 6px 12px;
  border-radius: 4px;
  letter-spacing: normal;
  background-color: #fff;
  text-align: right;
  color: #000;
  transform: translateY(-50%);
`