import axios, { AxiosError } from 'axios'
import { Thread, ThreadDetail } from '../models'

const BASE_URL_ON_SERVER = 'http://api:3001/api/v1'
const BASE_URL_ON_FRONT = 'http://localhost:3001/api/v1'

const getBaseUrl = (isServer: boolean) => {
  if (isServer) return BASE_URL_ON_SERVER

  return BASE_URL_ON_FRONT
}

export const fetchThreadsApi = async (isServer: boolean) => {
  try {
    const resp = await axios.get<{ threads: Thread[] }>(
      `${getBaseUrl(isServer)}/threads`
    )

    return { threads: resp.data.threads }
  } catch (error) {
    return { error: error as AxiosError }
  }
}

export const fetchTreadDetailApi = async (
  isServer: boolean,
  tid: string | string[]
) => {
  try {
    const resp = await axios.get<{ thread: ThreadDetail }>(
      `${getBaseUrl(isServer)}/threads/${tid}`
    )

    console.log('resp', resp)

    return { threadDetail: resp.data.thread }
  } catch (error) {
    return { error: error as AxiosError }
  }
}
