type Response = {
  success: boolean;
  token: string;
  refreshToken: string;
  response: string;
};

type LoginActionState = {
  success: boolean;
  errors: {
    email?: string | null;
    password?: string | null;
    form?: string | null;
  } | null;
  data: any;
  response: Response | null;
};

export { LoginActionState, Response };
