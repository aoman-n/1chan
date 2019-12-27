import { NextPage } from 'next'
import styled from 'styled-components'
import Layout from '~/components/Layout'

const About: NextPage = () => (
  <Layout title="about page">
    <Title>About Page.</Title>
  </Layout>
)

const Title = styled.h1`
  color: goldenrod;
`

export default About
