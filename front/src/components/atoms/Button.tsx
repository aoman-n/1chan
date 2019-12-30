import styled from 'styled-components'
import { Button } from 'semantic-ui-react'

const StyledButton = styled(Button)`
  background-color: ${props => props.theme.color.primary} !important;
  color: #ffffff !important;

  &:hover {
    opacity: 0.8;
  }
`

export default StyledButton
