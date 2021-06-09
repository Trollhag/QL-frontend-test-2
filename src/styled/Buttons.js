import styled from 'styled-components/macro'

const Button = styled.button.attrs({ type: 'button' })`
  font-size: 22px;
  display: block;
  width: 100%;
  appearance: none;
  border: none;
  border-radius: 4px;
  background-color: pink;
  color: #333;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

export default Button