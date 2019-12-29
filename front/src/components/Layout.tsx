import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Head from 'next/head'
import Header from '~/components/Header'

type Props = {
  title?: string
  withHeader?: boolean
}

const Layout: React.FC<Props> = ({
  children,
  title = 'This is the default title',
  withHeader = false
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
    </Head>{' '}
    <header>
      <nav>
        |{' '}
        <Link href="/">
          <a>Home</a>
        </Link>{' '}
        |
      </nav>
    </header>
    {withHeader && <Header />}
    <Body>{children}</Body>
  </div>
)

const Body = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 20px;
`

export default Layout
