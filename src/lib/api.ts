import { graphqlAction } from "@/actions";

const queryFn = async ({ meta }: { meta: any }) => {
  try {
    const response = await graphqlAction<Promise<any>>({
      query: meta?.usersQuery,
      variables: meta?.variables,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { queryFn };
