import React, { useState, createRef } from 'react'
import styled from 'styled-components'
import { Form, Segment, Message, Button as SButton } from 'semantic-ui-react'
import SnackBar from '~/components/SnackBar'
import Button from '~/components/atoms/Button'
import useOpen from '~/hooks/use-open'
import { postPost, PostFormParams } from '~/utils/api'

const initialFormData = {
  name: '',
  message: ''
}
const initialFormStatus = {
  isLoading: false,
  error: false,
  message: ''
}

const PostForm: React.FC<{ threadId: number }> = ({ threadId }) => {
  const [fileName, setFileName] = useState('')
  const fileRef = createRef<HTMLInputElement>()
  const [formData, setFormData] = useState(initialFormData)
  const [formStatus, setFormStatus] = useState(initialFormStatus)
  const { open, onOpen, onClose } = useOpen(false)

  const reset = () => {
    setFormData(initialFormData)
    setFormStatus(initialFormStatus)
  }

  const handleChangeText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeFile = () => {
    if (fileRef.current && fileRef.current.files) {
      setFileName(fileRef.current.files[0].name)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus({ ...formStatus, isLoading: true })
    const formParams: PostFormParams = { threadId, ...formData }
    if (fileRef.current && fileRef.current.files) {
      formParams.image = fileRef.current.files[0]
    }
    const resp = await postPost(formParams)
    if (resp.status === 'ok') {
      console.log('post: ', resp.post)
      reset()
      onOpen()
    } else {
      console.error('error: ', resp.error)
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
              onChange={handleChangeText}
              value={formData.name}
            />
          </Form.Field>
          <Form.Field>
            <label>メッセージ:</label>
            <textarea
              name="message"
              placeholder="メッセージ..."
              onChange={handleChangeText}
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
                onChange={handleChangeFile}
              />
            </ButtonWrapper>
            {fileName && <FileName>{fileName}</FileName>}
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
const FileName = styled.span``

export default PostForm
