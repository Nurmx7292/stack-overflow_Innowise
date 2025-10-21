export interface Comment {
  id: string
  content: string
  user: {
    id: string
    username: string
    role: string
  }
}

export interface CreateCommentRequest {
  content: string
  snippetId: number
}

export interface UpdateCommentRequest {
  content: string
}
