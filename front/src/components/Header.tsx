import React from 'react'
import styled from 'styled-components'
import { Header } from 'semantic-ui-react'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'

const HeaderComponent: React.FC = () => (
  <div>
    <Header as="h2" icon textAlign="center">
      <Icon name="users" circular />
      <HeaderContent>1chan</HeaderContent>
      <Header.Subheader>Next.jsとGolangを使ったサンプル掲示板</Header.Subheader>
    </Header>
  </div>
)

const HeaderContent = styled(Header.Content)`
  margin-top: 4px;
  margin-bottom: 4px;
`

export default HeaderComponent
