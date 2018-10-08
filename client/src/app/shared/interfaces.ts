export interface User {
  login: string,
  password: string
  name?: string
}
export interface Actor {
  name: string,
  surname: string
  year: number
  photo?: string,
}

export interface Movie {
  name: string,
  year: number,
  about: string,
  poster?: string,
  category: Category,
  list: Actor[],
  _id?: string
}

export interface Category {
  name: string
  _id?: string
}
