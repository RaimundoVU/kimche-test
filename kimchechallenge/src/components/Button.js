import styled from 'styled-components'

const Button = styled.button`
  font-weight: 400px;
  color: ${props => props.filter ? 'white' : 'black'};
  background: ${props => props.filter ? '#1980FF' : '#F5F5F5'};
  border-radius: 3px;
  width: 125px;
  height: 20px;
  cursor: pointer;
  &:hover {
    box-shadow: 1px 2px 5px rgb(0,0,0,0.3);
  }
`

export default Button
