const usersQuery = /* GraphQL */ `
  query Users {
    users(first: 10) {
      totalCount
      edgeCount
      edges {
        node {
          id
          name
          email
          username
        }
      }
    }
  }
`;

export { usersQuery };
