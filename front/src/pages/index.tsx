import { NextPage } from 'next'
import styled from 'styled-components'
import { List, Button, Header } from 'semantic-ui-react'

import Layout from '~/components/Layout'
import Modal from '~/components/Modal'
import ThreadForm from '~/components/ThreadForm'
import ThreadComponent from '~/components/Thread'
import useOpen from '~/hooks/use-open'
import { Thread } from '~/models'
import { fetchThreadsApi } from '~/utils/api'

interface ThreadsPageProps {
  threads: Thread[]
}

const IndexPage: NextPage<ThreadsPageProps> = ({ threads }) => {
  const { open, onOpen, onClose } = useOpen(false)

  return (
    <Layout title="thread list page." header>
      <ButtonWrapper>
        <Button basic onClick={onOpen}>
          スレッドを作成
        </Button>
        <Modal
          open={open}
          onClose={onClose}
          title="スレッドを作成します"
          Content={<ThreadForm />}
        />
      </ButtonWrapper>
      <StyledHeader as="h3">スレッド一覧</StyledHeader>
      <List divided relaxed selection>
        {threads.map(thread => (
          <ThreadComponent key={thread.id} thread={thread} />
        ))}
      </List>
    </Layout>
  )
}

const StyledHeader = styled(Header)`
  padding: 0 6px;
`
const ButtonWrapper = styled.div``

IndexPage.getInitialProps = async ctx => {
  const isServer = !!ctx.req

  try {
    const { threads } = await fetchThreadsApi(isServer)

    return { threads }
  } catch (error) {
    console.error('fetch threads error: ', error)
    return { threads: [] }
  }
}

export default IndexPage
