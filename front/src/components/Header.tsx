import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Header } from 'semantic-ui-react'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'

const HeaderComponent: React.FC = () => (
  <Continer>
    <Header as="h1" icon textAlign="center">
      <Link href={`/`}>
        <Content>
          <Icon name="users" circular />
          <HeaderContent>1chan</HeaderContent>
          <Header.Subheader>
            Next.jsとGolangを使ったサンプル掲示板
          </Header.Subheader>
        </Content>
      </Link>
    </Header>
  </Continer>
)

const Continer = styled.div`
  height: ${props => props.theme.size.headerHeight}px;
  display: flex;
  align-items: center;
`
const Content = styled.div`
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`
const HeaderContent = styled(Header.Content)`
  margin-top: 4px;
  margin-bottom: 4px;
`

export default HeaderComponent
