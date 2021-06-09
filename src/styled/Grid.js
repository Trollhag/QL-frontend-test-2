import styled from 'styled-components'

export const Container = styled.main`
  position: relative;
  padding: 40px;
  margin: 0 auto;
  width: 600px;
  max-width: 100%;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
`

export const Grid = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
`
export const Column = styled.div`
    width: ${({ width = 100 }) => `${width}%`};
    flex-basis: ${({ width = 100 }) => `${width}%`};
    padding: 0 15px;
`