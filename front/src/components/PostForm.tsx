import React from 'react'
import styled from 'styled-components'
import { Form, Segment, Message, Button as SButton } from 'semantic-ui-react'
import SnackBar from '~/components/SnackBar'
import Button from '~/components/atoms/Button'
import useOpen from '~/hooks/use-open'
import useInputFile from '~/hooks/use-inputFile'
import useForm from '~/hooks/use-form'
import { postPost, PostFormParams } from '~/utils/api'
import { Post } from '~/models'

interface PostFormProps {
  threadId: number
  setPosts: (prev: Post[] | ((t: Post[]) => Post[])) => void
  scrollBottom: () => void
}

const PostForm: React.FC<PostFormProps> = ({
  threadId,
  setPosts,
  scrollBottom
}) => {
  const { fileRef, fileName, onChangeFile } = useInputFile()
  const { formData, formStatus, setFormStatus, reset, onChangeText } = useForm({
    name: '',
    message: ''
  })
  const { open, onOpen, onClose } = useOpen(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus({ ...formStatus, isLoading: true })
    const formParams: PostFormParams = { threadId, ...formData }
    if (fileRef.current && fileRef.current.files) {
      formParams.image = fileRef.current.files[0]
    }
    const resp = await postPost(formParams)
    if (resp.status === 'ok') {
      reset()
      onOpen()
      setPosts(prev => [...prev, resp.post])
      scrollBottom()
    } else {
      setFormStatus({
        ...formStatus,
        error: true,
        message: resp.error.response
          ? resp.error.response.data.message
          : '投稿に失敗しました。'
      })
    }
  }

  return (
    <>
      <SnackBar open={open} onClose={onClose} />
      <Segment>
        <Form
          onSubmit={handleSubmit}
          loading={formStatus.isLoading}
          error={formStatus.error}
        >
          <Form.Field>
            <label>名前:</label>
            <input
              name="name"
              placeholder="名無しさん"
              onChange={onChangeText}
              value={formData.name}
            />
          </Form.Field>
          <Form.Field>
            <label>メッセージ:</label>
            <textarea
              name="message"
              placeholder="メッセージ..."
              onChange={onChangeText}
              value={formData.message}
              rows={5}
            />
          </Form.Field>
          <Form.Field>
            <ButtonWrapper>
              <SButton
                as="label"
                htmlFor="file"
                content="画像を選択"
                labelPosition="left"
                icon="file image"
              />
              <input
                id="file"
                ref={fileRef}
                type="file"
                style={{ display: 'hidden' }}
                accept="image/png,image/jpg,image/jpeg"
                hidden
                onChange={onChangeFile}
              />
            </ButtonWrapper>
            {fileName && <span>{fileName}</span>}
          </Form.Field>
          <Message error content={formStatus.message} />
          <Button type="submit" disabled={!formData.message}>
            投稿
          </Button>
        </Form>
      </Segment>
    </>
  )
}

const ButtonWrapper = styled.span`
  width: 200px;
`

export default PostForm
