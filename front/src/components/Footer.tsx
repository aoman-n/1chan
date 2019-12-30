import React from 'react'
import styled from 'styled-components'

const Footer: React.FC = () => (
  <Container>
    <Text>© 2019 1chan.</Text>
  </Container>
)

const Container = styled.footer`
  border-top: 1px solid #CCC;
  height: ${props => props.theme.size.footerHeight}px;
  background-color: ${props => props.theme.color.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`

const Text = styled.div`
  font-size: 13px;
  color: #ffffff;
  text-align: center;
`

export default Footer
