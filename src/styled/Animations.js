import React from 'react'
import { Transition, SwitchTransition } from 'react-transition-group'
import styled, { keyframes } from 'styled-components'

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

export function AnimateText({ children }) {
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