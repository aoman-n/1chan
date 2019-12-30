import styled from 'styled-components'
import { AxiosError } from 'axios'
import { NextPage } from 'next'
import { Header } from 'semantic-ui-react'
import Layout from '~/components/Layout'
import Post from '~/components/Post'
import PostForm from '~/components/PostForm'
import { fetchTreadDetailApi } from '~/utils/api'
import { ThreadDetail } from '~/models/index'

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

  const { id, title, description, posts } = threadDetail

  return (
    <Layout title={`1chan - ${title} スレッドへの投稿ページ`} header>
      <h2>{title}</h2>
      <p>{description}</p>
      <PostForm threadId={id} />
      <StyledHeader as="h3">スレッドへの投稿一覧</StyledHeader>
      <PostList>
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </PostList>
    </Layout>
  )
}

const StyledHeader = styled(Header)`
  padding: 0 6px;
`
const PostList = styled.div`
  padding-top: 24px;
`

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
