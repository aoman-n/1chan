import { NextPage } from 'next'
import Link from 'next/link'
import { AxiosError } from 'axios'
import styled from 'styled-components'
import Layout from '../components/Layout'
import { Thread } from '../models'
import { fetchThreadsApi } from '../utils/api'

interface ThreadsPageProps {
  threads: Thread[]
  error?: AxiosError
}

const IndexPage: NextPage<ThreadsPageProps> = ({ threads }) => {
  if (error) {
    return <div>error.</div>
  }

  return (
    <Layout title="thread list page.">
      <Title>thread list page.</Title>
      <div>
        {threads.map(thread => (
          <Link href={`/threads/${thread.id}`} key={thread.id}>
            <a>
              <h3>{thread.title}</h3>
              <p>{thread.description}</p>
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

IndexPage.getInitialProps = async ctx => {
  const isServer = typeof ctx.req === 'undefined'

  try {
    const { threads } = await fetchThreadsApi(isServer)

    return { threads }
  } catch (error) {
    return { threads: [], error }
  }
}

const Title = styled.div`
  color: skyblue;
  font-size: 24px;
`

export default IndexPage
