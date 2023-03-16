type TStatus = 'open' | 'progress' | 'finished';
type TUser = {
  id: number,
  username: string
}

export interface IGame {
  id: number,
  board: [
    [
      number
    ]
  ],
  winner: TUser | null,
  first_player: TUser,
  second_player: TUser,
  created: string,
  status: TStatus
}

export interface IGames {
  count: number,
  next: string,
  previous: string,
  results: IGame[]
}
