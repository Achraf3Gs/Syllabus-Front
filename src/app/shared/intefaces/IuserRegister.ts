export interface IUserRegister {
  firstName: string;
  lastName: string;
  grade: string;
  function: string;
  email: string;
  password: string;
  confirmPassword: string;

  role: 'USER' | undefined;
}
