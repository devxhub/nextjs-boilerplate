import { getDictionary, getUsers } from "@/actions";
import LocaleSwitcherWrapper from "@/components/LocaleSwitcherWrapper";

export default async function Home() {
  const dict = await getDictionary();
  const users = await getUsers();

  return (
    <div className="h-screen grid place-content-center gap-y-5">
      <LocaleSwitcherWrapper />
      <p className="text-3xl font-medium">{dict.home.title}</p>

      <div className="space-y-2">
        <p className="font-medium">Render from server</p>
        <ul className="space-y-1">
          {users.map((user: { id: number; name: string }) => (
            <li key={user.id}>
              {user.id} {user.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
