import axios, { AxiosError } from 'axios'
import { Thread, ThreadDetail, Post } from '../models'

const BASE_URL_ON_SERVER = 'http://api:3001/api/v1'
const BASE_URL_ON_FRONT = 'http://localhost:3001/api/v1'

const getBaseUrl = (isServer: boolean) => {
  if (isServer) return BASE_URL_ON_SERVER

  return BASE_URL_ON_FRONT
}

export const fetchThreadsApi = async (isServer: boolean) => {
  const resp = await axios.get<{ threads: Thread[] }>(
    `${getBaseUrl(isServer)}/threads`
  )

  return { threads: resp.data.threads }
}

export const fetchTreadDetailApi = async (
  isServer: boolean,
  tid: string | string[]
) => {
  const resp = await axios.get<{ thread: ThreadDetail }>(
    `${getBaseUrl(isServer)}/threads/${tid}`
  )

  return { threadDetail: resp.data.thread }
}

type PostThreadValue =
  | { type: 'ok'; thread: Thread }
  | { type: 'ng'; error: AxiosError<{ message: string }> }

export const postThread = async (
  title: string,
  description: string
): Promise<PostThreadValue> => {
  try {
    const resp = await axios.post<{ thread: Thread }>(
      `${BASE_URL_ON_FRONT}/threads`,
      {
        title,
        description
      }
    )

    return { type: 'ok', thread: resp.data.thread }
  } catch (error) {
    return {
      type: 'ng',
      error: error as AxiosError<{ message: string }>
    }
  }
}

export interface PostFormParams {
  threadId: number
  name: string
  message: string
  image?: File
}

export const postPost = async (params: PostFormParams) => {
  const { threadId, name, message, image } = params
  const formData = new FormData()
  formData.append('name', name)
  formData.append('message', message)
  if (image) {
    formData.append('image', image)
  }

  try {
    const resp = await axios.post<{ post: Post }>(
      `${BASE_URL_ON_FRONT}/threads/${threadId}/posts`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )

    return { status: 'ok' as const, post: resp.data.post }
  } catch (error) {
    return {
      status: 'ng' as const,
      error: error as AxiosError<{ message: string }>
    }
  }
}
