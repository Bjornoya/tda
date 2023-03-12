interface IUserData {
  username: string;
  password: string;
}

const PARAMS = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
};

async function withErrorHandler(response: Response) {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
}

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
