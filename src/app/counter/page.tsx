"use client";

import { Button } from "@/components/ui/button";
import { usersQuery } from "@/graphql";
import { queryFn } from "@/lib";
import { useCounterStore } from "@/store";
import { useQuery } from "@tanstack/react-query";

export default function Counter() {
  const { count, increment, decrement } = useCounterStore();

  const { data, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn,
    meta: { usersQuery },
  });

  let content = <></>;

  if (isLoading) {
    content = <div className="text-gray-500">Loading...</div>;
  }

  if (!isLoading && error) {
    content = <div className="text-red-500">Something went wrong</div>;
  }

  if (!isLoading && !error && data?.users?.totalCount === 0) {
    content = <div className="text-gray-500">Data not found</div>;
  }

  if (!isLoading && !error && data?.users?.totalCount > 0) {
    content = data.users.edges.map((user: { node: { id: number; name: string } }) => (
      <div key={user.node.id} className="text-gray-800 text-left">
        {user.node.id} {user.node.name}
      </div>
    ));
  }

  return (
    <div className="h-screen grid place-content-center gap-y-10">
      <div className="space-y-5">
        <p className="text-3xl font-medium">Counter Template</p>
        <div className="p-2 w-[140px] mx-auto text-center text-lg text-white bg-orange-500 font-semibold rounded">
          {count}
        </div>
        <div className="flex items-center justify-center gap-x-4">
          <Button onClick={() => increment(1)} className="text-2xl bg-green-500">
            +
          </Button>
          <Button
            disabled={count === 0}
            onClick={() => decrement(1)}
            className="text-2xl bg-red-500"
          >
            -
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xl font-medium">Total Users ({data?.users?.totalCount})</p>
        <hr className="pb-2" />
        {content}
      </div>
    </div>
  );
}
