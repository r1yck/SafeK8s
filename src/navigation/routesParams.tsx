type PasswordData = {
  id: string;
  title: string;
  link: string;
  email: string;
  password: string;
  description?: string;  
};

export type RoutesParams = {
  Login: undefined;
  ResetPassword: undefined;
  Register: undefined;
  Dashboard: undefined;
  New: undefined;
  Details:  { passwordData: PasswordData };
  EditScreen: {
    passwordData: {
      id: string;
      title: string;
      link: string;
      email: string;
      password: string;
      description: string;
    };
    
  };
};
