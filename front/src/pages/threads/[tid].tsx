import { AxiosError } from 'axios'
import { NextPage } from 'next'
import Layout from '../../components/Layout'
import { fetchTreadDetailApi } from '../../utils/api'
import { ThreadDetail } from '../../models/index'

interface ThreadDetailProps {
  threadDetail: ThreadDetail
  error?: AxiosError
}

const ThreadDetailPage: NextPage<ThreadDetailProps> = ({
  threadDetail,
  error
}) => {
  if (error) {
    return <div>fetch Error.</div>
  }

  const { title, description, posts } = threadDetail

  return (
    <Layout>
      <h2>{title}</h2>
      <p>{description}</p>
      <div>
        {posts.map(post => (
          <div key={post.id}>
            <p>user: {post.userName}</p>
            <p>message: {post.message}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}

ThreadDetailPage.getInitialProps = async ctx => {
  const { tid } = ctx.query

  try {
    const { threadDetail } = await fetchTreadDetailApi(!!ctx.req, tid)

    return { threadDetail }
  } catch (error) {
    return { threadDetail: {} as ThreadDetail, error }
  }
}

export default ThreadDetailPage
