interface IUser {
  id: number,
  username: string,
  game_count: number,
  win_rate: number
}

export interface IUsers {
  count: number,
  next: string,
  previous: string
  results: IUser[]
}
