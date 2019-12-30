import React from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import { Button, Form, Message } from 'semantic-ui-react'
import useForm from '~/hooks/use-form'
import { postThread } from '~/utils/api'

const FormComponent: React.FC = () => {
  const { formData, formStatus, setFormStatus, onChangeText } = useForm({
    title: '',
    description: ''
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus({
      isLoading: true,
      error: false,
      message: ''
    })

    const resp = await postThread(formData.title, formData.description)

    if (resp.type === 'ok') {
      Router.push(`/threads/${resp.thread.id}`)
    } else {
      setFormStatus({
        isLoading: false,
        error: true,
        message: resp.error.response
          ? resp.error.response.data.message
          : 'スレッドの作成に失敗しました。'
      })
    }
  }

  return (
    <Form
      loading={formStatus.isLoading}
      onSubmit={handleSubmit}
      error={formStatus.error}
    >
      <Form.Field>
        <label>スレッドタイトル</label>
        <input name="title" onChange={onChangeText} value={formData.title} />
      </Form.Field>
      <Form.Field>
        <label>スレッド説明</label>
        <input
          name="description"
          onChange={onChangeText}
          value={formData.description}
        />
      </Form.Field>
      <Message error content={formStatus.message} />
      <StyledButton type="submit" disabled={!formData.title}>
        作成
      </StyledButton>
    </Form>
  )
}

const StyledButton = styled(Button)`
  background-color: ${props => props.theme.color.primary} !important;
  color: #ffffff !important;

  &:hover {
    opacity: 0.8;
  }
`

export default FormComponent
