interface IUserData {
  username: string;
  password: string;
}

type TMethod = 'GET' | 'POST'

/* --- helper functions ---  */

const PARAMS = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
};

function getAuthToken() {
  const user = localStorage.getItem('user');

  if (user) {
    return JSON.parse(user).token;
  }
  throw new Error('You have to provide a token!');
}

function fetchWithAuth(url: string, method: TMethod) {
  const token = getAuthToken();
  return fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  }).then((res) => res.json());
}

async function withErrorHandler(response: Response) {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
}

/* --- api call functions ---  */

export async function registerUser(data: IUserData) {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/register/`, {
    ...PARAMS,
    body: JSON.stringify(data),
  });
  return withErrorHandler(response);
}

export async function loginUser(data: IUserData) {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/login/`, {
    ...PARAMS,
    body: JSON.stringify(data),
  });
  return withErrorHandler(response);
}

export function createGame() {
  return fetchWithAuth(`${process.env.REACT_APP_API_URL}/games/`, 'POST');
}

export function joinGame(id: number) {
  const token = getAuthToken();
  return fetch(`${process.env.REACT_APP_API_URL}/games/${id}/join/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      winner: {},
      first_player: {},
      second_player: {},
    }),
  });
}

export function makeMove(id: string, move: { row: number, col: number }) {
  const token = getAuthToken();
  return fetch(`${process.env.REACT_APP_API_URL}/games/${id}/move/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(move),
  });
}

export function getUsers(offset: number) {
  return fetchWithAuth(`${process.env.REACT_APP_API_URL}/users/?offset=${offset}&limit=10`, 'GET');
}

export function getGames(offset: number, status?: string) {
  return fetchWithAuth(`${process.env.REACT_APP_API_URL}/games/?offset=${offset}&limit=10${status ? `&status=${status}` : ''}`, 'GET');
}

export function getGame(id: string) {
  return fetchWithAuth(`${process.env.REACT_APP_API_URL}/games/${id}/`, 'GET');
}
