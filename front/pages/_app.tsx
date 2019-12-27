import React from 'react'
import App from 'next/app'
import 'semantic-ui-css/semantic.min.css'

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props

    return <Component {...pageProps} />
  }
}