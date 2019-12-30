import { useState, useRef, useCallback } from 'react'
import styled from 'styled-components'
import { AxiosError } from 'axios'
import { NextPage } from 'next'
import { Header } from 'semantic-ui-react'
import Layout from '~/components/Layout'
import PostComponent from '~/components/Post'
import PostForm from '~/components/PostForm'
import Marker from '~/components/atoms/Marker'
import { fetchTreadDetailApi } from '~/utils/api'
import { ThreadDetail, Post } from '~/models'

interface ThreadDetailProps {
  threadDetail: ThreadDetail
  error?: AxiosError
}

const ThreadDetailPage: NextPage<ThreadDetailProps> = ({
  threadDetail,
  error
}) => {
  const { id, title, description, posts } = threadDetail
  const [postsState, setPosts] = useState<Post[]>(posts)
  const bottomEl = useRef<HTMLDivElement>(null)

  if (error) {
    return <div>fetch Error.</div>
  }

  const scrollBottom = useCallback(() => {
    if (bottomEl && bottomEl.current) {
      bottomEl.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [bottomEl])

  return (
    <Layout title={`1chan - ${title} スレッドへの投稿ページ`} header>
      <Header as="h2">{title}</Header>
      <p>{description}</p>
      <PostForm threadId={id} setPosts={setPosts} scrollBottom={scrollBottom} />
      <StyledHeader as="h3">
        <Marker>スレッドへの投稿一覧</Marker>
      </StyledHeader>
      <PostList>
        {postsState.map(post => (
          <PostComponent key={post.id} post={post} />
        ))}
      </PostList>
      <div style={{ float: 'left', clear: 'both' }} ref={bottomEl}></div>
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
