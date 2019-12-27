export interface Thread {
  id: number
  title: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface Post {
  id: number
  threadId: number
  userName: string
  message: string
  image: string
  createdAt: string
  updatedAt: string
}

export interface ThreadDetail {
  id: number
  title: string
  description: string
  createdAt: string
  updatedAt: string
  posts: Post[]
}
