export interface User {
  id: string
  username: string
  role: string
}

export interface Mark {
  id: string
  type: 'like' | 'dislike'
  user: User
}

export interface Comment {
  id: string
  content: string
}

export interface Snippet {
  id: string
  language: string
  code: string
  user: User
  marks?: Mark[]
  comments?: Comment[]
}

export interface SnippetsResponse {
  data: Snippet[]
  meta: {
    itemsPerPage: number
    totalItems: number
    currentPage: number
    totalPages: number
    sortBy: [string, string][]
    searchBy: string[]
    search: string
    select: string[]
    filter: Record<string, any>
  }
  links: {
    first: string
    previous: string
    current: string
    next: string
    last: string
  }
}

export interface SnippetsParams {
  userId?: string
  page?: number
  limit?: number
  sortBy?: string[]
  search?: string
  searchBy?: string[]
}

export interface CreateSnippetRequest {
  code: string
  language: string
}

export interface UpdateSnippetRequest {
  code?: string
  language?: string
}

export interface MarkSnippetRequest {
  mark: 'like' | 'dislike'
}

export interface MarkSnippetResponse {
  mark: 'like' | 'dislike'
}
