const login = /* GraphQL */ `
  mutation Login($email: String, $password: String) {
    loginHr(input: { email: $email, password: $password }) {
      success
      response
      token
      tokenExpire
      refreshToken
      user {
        id
        email
        name
        company {
          id
          name
          image
        }
      }
    }
  }
`;

const register = /* GraphQL */ `
  mutation CreateHr($name: String, $email: String, $password: String, $lang: ID) {
    createHr(input: { name: $name, email: $email, password: $password, lang: $lang }) {
      success
      user {
        id
        email
        isActive
      }
      token
      refreshToken
      response
    }
  }
`;

export { login, register };
