const loginMutation = /* GraphQL */ `
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

const refreshTokenMutation = /* GraphQL */ `
  mutation RefreshToken($refreshToken: String) {
    refreshToken(refreshToken: $refreshToken) {
      token
      refreshToken
      refreshExpiresIn
      payload
    }
  }
`;

export { loginMutation, refreshTokenMutation };
