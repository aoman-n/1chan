import React from 'react'
import styled, { css } from 'styled-components'
import Head from 'next/head'
import Header from '~/components/Header'
import Footer from '~/components/Footer'

type Props = {
  title?: string
  header?: boolean
}

const Layout: React.FC<Props> = ({
  children,
  title = 'This is the default title',
  header = false
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        rel="stylesheet prefetch"
        href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.8/components/icon.min.css"
      />
    </Head>
    {header && <Header />}
    <Body header={header}>{children}</Body>
    <Footer />
  </div>
)

const Body = styled.div<{ header: boolean }>`
  ${({ theme, header }) =>
    header
      ? css`
          min-height: calc(
            100vh - ${theme.size.headerHeight}px - ${theme.size.footerHeight}px
          );
        `
      : css`
          min-height: calc(100vh - ${theme.size.footerHeight}px);
        `}
  max-width: 600px;
  margin: 0 auto;
  padding: 25px 20px;
`

export default Layout
