import { NextPage } from 'next'
import styled from 'styled-components';
import { Button } from 'semantic-ui-react'
import Layout from '../components/Layout';

import 'semantic-ui-css/semantic.min.css'

const Index: NextPage<{ userAgent: string }> = ({ userAgent }) => (
  <Layout title="home page">
    <Title>Hello world! - user agent: {userAgent}</Title>
    <Button>Button UI</Button>
  </Layout>
)

Index.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
  return { userAgent };
};

const Title = styled.h1`
  color: skyblue;
  font-size: 16px;
`

export default Index