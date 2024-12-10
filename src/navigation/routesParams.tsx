type PasswordData = {
  id: string;
  title: string;
  link: string;
  email: string;
  password: string;
  description?: string;  // Permite description ser undefined
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
