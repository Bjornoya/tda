interface IUserData {
  username: string;
  password: string;
}

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

function fetchWithAuth(url: string) {
  const token = getAuthToken();
  return fetch(url, {
    method: 'GET',
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

export function getUsers(offset: number) {
  return fetchWithAuth(`${process.env.REACT_APP_API_URL}/users/?offset=${offset}&limit=10`);
}
