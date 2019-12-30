import React from 'react'
import Link from 'next/link'
import { List } from 'semantic-ui-react'
import { Thread } from '~/models'

interface ThreadProps {
  thread: Thread
}

const ThreadComponent: React.FC<ThreadProps> = ({ thread }) => {
  return (
    <Link href={`/threads/${thread.id}`} key={thread.id}>
      <List.Item>
        <List.Content as="a">
          <List.Header>{thread.title}</List.Header>
          <List.Description>{thread.description || <br />}</List.Description>
        </List.Content>
      </List.Item>
    </Link>
  )
}

export default ThreadComponent
