export interface User {
  login: string,
  password: string
  name?: string
  isAdmin?: boolean
  _id?: string
}
export interface Actor {
  name: string,
  surname: string
  year: number
  photo?: string,
  _id?: string
}

export interface Movie {
  name: string,
  year: number,
  about: string,
  poster?: string,
  category: Category,
  actors: any,
  _id?: string
}

export interface Category {
  name: string
  _id?: string
}
