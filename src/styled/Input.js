import styled, { css } from 'styled-components'

const validationBase = css`
    transition: outline .2s ease;
`
export const inputValidation = {
    base: validationBase,
    error: css`
        ${validationBase}
        outline: 1px solid red;
        border-radius: 4px;
    `
}

export const Label = styled.label`
    font-size: .65rem;
    font-weight: bold;
    color: #888;
    line-height: 1.5rem;
`

const styledInput = css`
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  padding: 10px 12px;
  font-size: 1rem;
  ${({ error }) => error ? inputValidation.error : inputValidation.base}
`

export const Input = styled.input`
  ${styledInput}
`

export const Select = styled.select`
  ${styledInput}
`;
