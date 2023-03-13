export interface ILoginFields {
  username: string;
  password: string;
}

export interface ISignUpFields extends ILoginFields {
  repeatPassword: string;
}

export interface IForm {
  onClick: () => void;
}
