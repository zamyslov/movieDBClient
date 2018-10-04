export interface User {
  login: string,
  password: string
  name?: string
}

export interface Movie {
  name: string,
  year: number,
  poster?: string,
  category: Category,
  _id?: string
}

export interface Category {
  name: string
  _id?: string
}
