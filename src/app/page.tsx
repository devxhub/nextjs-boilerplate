import { getDictionary, graphqlAction } from "@/actions";
import LocaleSwitcherWrapper from "@/components/LocaleSwitcherWrapper";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { usersQuery } from "@/graphql";
import { cookies } from "next/headers";

type User = {
  node: {
    id: string;
    name: string;
    email: string;
    username: string | null;
  };
};

export default async function Home() {
  const dict = await getDictionary();

  const cookieStore = await cookies();
  const authToken = cookieStore.get("dxh_access_token")?.value;

  // if (!authToken) redirect("/auth/login");

  const response = await graphqlAction<Promise<{ users: { edges: User[] } }>>({
    query: usersQuery,
  });

  // const users = response.users.edges || [];

  return (
    <div className="h-screen grid place-content-center gap-y-5">
      <LocaleSwitcherWrapper />
      <p className="text-3xl font-medium">{dict.home.title}</p>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">User ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {users.map((user: User) => (
              <TableRow key={user.node.id}>
                <TableCell className="font-medium">{user.node.id}</TableCell>
                <TableCell>{user.node.name}</TableCell>
                <TableCell>{user.node.email}</TableCell>
                <TableCell>{user.node.username}</TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
